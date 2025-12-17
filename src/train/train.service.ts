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
      console.log('조회된 열차가 없습니다.');
      return;
    }
    
    console.log('=== 🚆 기차 조회 결과 ===');
    items.forEach((item: any) => {
      console.log(`열차번호: ${item.trainno}`);
      console.log(`출발지: ${item.depplacename}`)
      console.log(`출발 시간: ${this.formatDateTime(item.depplandtime)}`);
      console.log(`도착지: ${item.arrplacename}`)
      console.log(`도착 시간: ${this.formatDateTime(item.arrplandtime)}`);
      console.log(`종류: ${item.traingradename}`);
      console.log('-----------------------------');
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
    console.log('=== 🏢 기차역 목록 ===');
    console.log(items);
  }

  async findStation(station: string) {
    const exactlyStation = await this.trainParseService.findStation(station);
    if (exactlyStation) {
      console.log(`"${station}"은 존재하는 역 입니다.`);
    } else {
      console.log('"trainfinder stationlist" 명령어로 존재하는 역을 확인해 보세요.');
    }
  }

  async stationList() {
    const list = await this.trainParseService.stationList();
    list.forEach((item: string) => {
      console.log(item);
    });
  }
}
