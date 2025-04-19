import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RiddleBotService } from "./bot/riddle-bot.service";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [RiddleBotService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly riddleBotService: RiddleBotService) {}

  onModuleInit() {
    this.riddleBotService.start();
  }
}
