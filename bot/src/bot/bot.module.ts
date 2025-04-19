import { Module } from "@nestjs/common";
import { RiddleBotService } from "./riddle-bot.service";

@Module({
  providers: [RiddleBotService],
})
export class BotModule {}
