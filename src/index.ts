#!/usr/bin/env node
import { Command } from 'commander';
import { TrainService } from './train/train.service';
import { TrainController } from './train/train.controller';
import { TrainParseService } from './train/train-parse.service';

const program = new Command();
const trainParseService = new TrainParseService();
const trainService = new TrainService(trainParseService);
const trainController = new TrainController(trainService);

program
  .name('train')
  .description('KTX/SRT CLI')
  .version('1.0.0');

program
  .command('search')
  .description('출발/도착/날짜 기반 기차 조회')
  .option('--from <dep>', '출발역 ID')
  .option('--to <arr>', '도착역 ID')
  .option('--date <date>', '날짜 YYYYMMDD', '20230405')
  .action((opts) => {
    trainController.search(opts.from, opts.to, opts.date);
  });


program
  .command('city')
  .description('city')
  .option('--code <codeNumber>')
  .action((opts) => {
    trainController.cityCodeList(opts.code);
  });

  program
  .command('test')
  .description('test')
  .action((opts) => {
    trainController.test();
  });

program.parse();
