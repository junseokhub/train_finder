#!/usr/bin/env node
import { Command } from 'commander';
import { TrainService } from './train/train.service';
import { TrainParseService } from './train/train-parse.service';

const program = new Command();
const trainParseService = new TrainParseService();
const trainService = new TrainService(trainParseService);

function getTodayYYYYMMDD(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

program
  .name('train')
  .description('KTX/SRT CLI')
  .version('1.0.0');

program 
  .command('trainlist')
  .description('List all train types')
  .action(() => {
    trainService.trainList();
  });

program
  .command('search')
  .description('Search trains by departure, arrival, date, and train type')
  .option('--dep <dep>', 'Departure station ID')
  .option('--arr <arr>', 'Arrival station ID')
  .option('--date <date>', 'Date (YYYYMMDD)', getTodayYYYYMMDD())
  .option('--train <train>', 'Train type', '00')
  .action((opts) => {
    trainService.searchTrain(opts.dep, opts.arr, opts.date, opts.train);
  });

program
  .command('station')
  .description('Check if a station exists')
  .option('--st <st>', 'Station name or ID to search')
  .action((opts) => {
     trainService.findStation(opts.st);
  });

program
  .command('stationlist')
  .description('List all stations')
  .action(() => {
    trainService.stationList();
  });

program.parse();
