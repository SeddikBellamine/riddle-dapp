import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";
import OpenAI from "openai";
import { OnchainRiddle__factory } from "../types/contract/factories/OnchainRiddle__factory";
import { OnchainRiddle } from "../types/contract/OnchainRiddle";

@Injectable()
export class RiddleBotService {
  private readonly logger = new Logger(RiddleBotService.name);
  private contract: OnchainRiddle;
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    // Load and validate environment variables
    const rpcUrl = this.getEnvOrThrow("RPC_URL");
    const botPrivateKey = this.getEnvOrThrow("BOT_PRIVATE_KEY");
    const contractAddress = this.getEnvOrThrow("CONTRACT_ADDRESS");
    const openAiKey = this.getEnvOrThrow("OPENAI_API_KEY");

    // Set up ethers provider and contract
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(botPrivateKey, provider);
    this.contract = OnchainRiddle__factory.connect(contractAddress, wallet);

    // Set up OpenAI client
    this.openai = new OpenAI({ apiKey: openAiKey });
  }

  private getEnvOrThrow(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`❌ Missing required environment variable: ${key}`);
    }
    return value;
  }

  async start() {
    this.logger.log("🤖 Riddle bot starting...");

    const isActive = await this.contract.isActive();
    if (!isActive) {
      this.logger.log("📜 No active riddle found. Posting the first one...");
      await this.postNewRiddle();
    }

    this.logger.log("👂 Listening for 'Winner' events...");
    void this.contract.on(
      this.contract.filters.Winner(undefined),
      (user: string) => {
        void this.handleWinner(user);
      },
    );
  }

  private async handleWinner(winner: string): Promise<void> {
    this.logger.log(`🏆 Riddle solved by: ${winner}`);
    try {
      await this.postNewRiddle();
    } catch (err) {
      this.logger.error("❌ Failed to post new riddle:", err);
    }
  }

  private async postNewRiddle(): Promise<void> {
    const { riddle, answer } = await this.generateRiddle();
    const answerHash = ethers.keccak256(ethers.toUtf8Bytes(answer));
    const tx = await this.contract.setRiddle(riddle, answerHash);
    await tx.wait();
    this.logger.log(`✅ New riddle set: ${riddle}`);
  }

  private async generateRiddle(): Promise<{ riddle: string; answer: string }> {
    const prompt =
      "Give me a short riddle with a one-word answer. Format like:\nRiddle: ...\nAnswer: ...";

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0]?.message?.content ?? "";
    const match = content.match(/Riddle:\s*(.*?)\s*Answer:\s*(\w+)/is);

    if (!match) {
      this.logger.error("Failed to parse riddle/answer from OpenAI response");
      throw new Error("Invalid riddle format from OpenAI");
    }

    const riddle = match[1].trim();
    const answer = match[2].trim();

    this.logger.log(
      `🧠 Riddle generated:\n- Riddle: ${riddle}\n- Answer: ${answer}`,
    );
    this.logger.log(`- Riddle: ${riddle}`);
    this.logger.log(`- Answer: ${answer}`);
    return { riddle, answer };
  }
}
