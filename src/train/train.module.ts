import { Module } from "@nestjs/common";
import { TrainService } from "./train.service";
import { TrainController } from "./train.controller";
import { TrainParseService } from "./train-parse.service";

@Module({
  controllers: [TrainController],
  providers: [TrainService, TrainParseService],
})
export class TrainModule {}
