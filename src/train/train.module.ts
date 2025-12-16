import { Module } from "@nestjs/common";
import { TrainService } from "./train.service";
import { TrainParseService } from "./train-parse.service";

@Module({
  providers: [TrainService, TrainParseService],
})
export class TrainModule {}
