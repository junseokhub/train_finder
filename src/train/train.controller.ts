import { TrainService } from './train.service';

export class TrainController {
  constructor(private trainService: TrainService) {}

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
    return await this.trainService.trainList();
  }

  async search(dep: string, arr: string, date: string, trainName: string) {
    const items = await this.trainService.searchTrain(dep, arr, date, trainName);

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
    const items = await this.trainService.cityCodeList(cityCode);
    console.log(cityCode);
    console.log('=== 🏢 기차역 목록 ===');
    console.log(items);
  }

  async test() {
    const items = await this.trainService.test();
    console.log(items);
  }
}
