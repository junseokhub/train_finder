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
  .command('trainlist')
  .description('기차 종류 전체조회')
  .action(() => {
    trainController.trainList();
  })

program
  .command('search')
  .description('출발/도착/날짜/기차종류 기반 기차 조회')
  .option('--dep <dep>', '출발역 ID')
  .option('--arr <arr>', '도착역 ID')
  .option('--date <date>', '날짜 YYYYMMDD', '20230405')
  .option('--train <train>', '열차종류', '00')
  .action((opts) => {
    trainController.search(opts.dep, opts.arr, opts.date, opts.train);
  });

// program
//   .command('city')
//   .description('')
//   .option('--code <codeNumber>')
//   .action((opts) => {
//     trainController.cityCodeList(opts.code);
//   });

program
  .command('citylist')
  .description('기차역 전체조회')
  .action((opts) => {
    trainController.cityList();
  });

program.parse();
