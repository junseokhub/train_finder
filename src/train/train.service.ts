import axios from 'axios';
import { TrainParseService } from './train-parse.service';

export class TrainService {
  private serviceKey = 'd2a259fae046ba1b65a3c083fdd80de2a781e37eb27f939d758af1de25f606f9';
  constructor(
    private readonly trainParseService: TrainParseService
  ) {}

  formatDateTime(dateTime: number): string {
    const dateTimeString = dateTime.toString();
    
    const year = dateTimeString.slice(0, 4);
    const month = dateTimeString.slice(4, 6);
    const day = dateTimeString.slice(6, 8);
    const hour = dateTimeString.slice(8, 10);
    const minute = dateTimeString.slice(10, 12);
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  async trainList() {
     return await this.trainParseService.trainList();
  }

  async today(date: string) {
    const now = new Date();
    const kstOffset = 9 * 60;
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset() + kstOffset);

    const currentDate = now.toISOString().slice(0, 10).replace(/-/g, '');

    if (date < currentDate) {
      throw new Error('The provided date is earlier than the current date.');
    }
    return
  }

  async searchTrain(depName: string, arrName: string, date: string, trainName: string) {
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo';
    this.today(date);
    const trainGradeCode = await this.trainParseService.parseToNodeId(trainName);
    const nodeId = await this.trainParseService.trainDepArrFinder(depName, arrName);
    const depPlaceId = nodeId.depNodeId;
    const arrPlaceId = nodeId.arrNodeId;
    const params = new URLSearchParams({
      serviceKey: this.serviceKey,
      _type: 'json',
      depPlaceId,
      arrPlaceId,
      depPlandTime: date,
      trainGradeCode,
    });

    const response = await axios.get(`${url}?${params.toString()}`, { responseType: 'json' });
    const items = response.data?.response?.body?.items?.item || [];
    if (!items.length) {
      console.log('No trains found.');
    }

    console.log('=== 🚆 Train Search Results ===');
    items.forEach((item: any) => {
      console.log('-------------Result--------------');
      console.log(`Train Number: ${item.trainno}`);
      console.log(`Departure: ${item.depplacename}`);
      console.log(`Departure Time: ${this.formatDateTime(item.depplandtime)}`);
      console.log(`Arrival: ${item.arrplacename}`);
      console.log(`Arrival Time: ${this.formatDateTime(item.arrplandtime)}`);
      console.log(`Type: ${item.traingradename}`);
      console.log('--------------------------------');
    });
  }

  async cityCodeList(cityCode: string) {
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList';

    const params = new URLSearchParams({
      numOfRows: "100",
      serviceKey: this.serviceKey,
      _type: 'json',
      cityCode,
    });

    const response = await axios.get(`${url}?${params.toString()}`, { responseType: 'json' });
    const items = response.data?.response?.body?.items?.item || [];
    console.log(cityCode);
    console.log('=== 🏢 Station List ===');
    console.log(items);
  }

  async findStation(station: string) {
    const exactlyStation = await this.trainParseService.findStation(station);
    if (exactlyStation) {
      console.log(`"${station}" is an existing station.`);
    } else {
      console.log('Please check the available stations using the "trainfinder stationlist" command.');
    }
  }

  async stationList() {
    const list = await this.trainParseService.stationList();
    list.forEach((item: string) => {
      console.log(item);
    });
  }
}
