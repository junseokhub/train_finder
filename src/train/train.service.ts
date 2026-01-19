import axios from 'axios';
import { TrainParseService } from './train-parse.service';
import { TrainInfo } from './interface';

export class TrainService {
  private readonly serviceKey = 'd2a259fae046ba1b65a3c083fdd80de2a781e37eb27f939d758af1de25f606f9';
  constructor(
    private readonly trainParseService: TrainParseService
  ) {}

  private formatDateTime(dateTime: number): string {
    const dateTimeString = dateTime.toString();
    
    const year = dateTimeString.slice(0, 4);
    const month = dateTimeString.slice(4, 6);
    const day = dateTimeString.slice(6, 8);
    const hour = dateTimeString.slice(8, 10);
    const minute = dateTimeString.slice(10, 12);
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  private async fetchTrainData(codes: string[], depId: string, arrId: string, date: string): Promise<TrainInfo[]> {
    const requests = codes.map(code => 
      axios.get('http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo', {
        params: {
          serviceKey: this.serviceKey,
          _type: 'json',
          depPlaceId: depId,
          arrPlaceId: arrId,
          depPlandTime: date,
          trainGradeCode: code,
          numOfRows: 100
        }
      })
    );

    const responses = await Promise.all(requests);
    const combined: TrainInfo[] = [];

    responses.forEach(res => {
      const items = res.data?.response?.body?.items?.item;
      if (items) {
        Array.isArray(items) ? combined.push(...items) : combined.push(items);
      }
    });

    return combined;
  }

  private processTrainItems(items: TrainInfo[], time?: string): TrainInfo[] {
    let result = [...items];

    if (time) {
      const filterHour = parseInt(time, 10);
      result = result.filter(item => {
        const hour = parseInt(String(item.depplandtime).slice(8, 10), 10);
        return hour >= filterHour;
      });
    }

    return result.sort((a, b) => Number(a.depplandtime) - Number(b.depplandtime));
  }

  private displayResults(items: TrainInfo[], trainName: string, time?: string) {
    if (items.length === 0) {
      console.log(`\n❌ No trains found for [${trainName.toUpperCase()}]${time ? ' after ' + time + ':00' : ''}.`);
      return;
    }

    console.log(`\n=== 🚆 ${trainName.toUpperCase()} Search Results (${time ? 'After ' + time + ':00, ' : ''}Total: ${items.length}) ===`);
    console.log('--------------------------------');
    items.forEach(item => {
      console.log(`Train Number: ${item.trainno}`);
      console.log(`Departure: ${item.depplacename}`);
      console.log(`Departure Time: ${this.formatDateTime(item.depplandtime)}`);
      console.log(`Arrival: ${item.arrplacename}`);
      console.log(`Arrival Time: ${this.formatDateTime(item.arrplandtime)}`);
      console.log(`Type: ${item.traingradename}`);
      console.log(`Adult Charge: ${item.adultcharge.toLocaleString()} Won`);
      console.log('--------------------------------');
    });
  }

  private async validateDate(date: string) {
    const now = new Date();
    const kstDate = new Date(now.getTime() + (9 * 60 * 60 * 1000))
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '');
    
    if (date < kstDate) {
      throw new Error('Cannot search for dates in the past.');
    }
  }
  
  async searchTrain(depName: string, arrName: string, date: string, trainName: string, time?: string) {
    try {
      await this.validateDate(date);
      
      const codes = await this.trainParseService.parseToNodeId(trainName);
      const { depNodeId, arrNodeId } = await this.trainParseService.trainDepArrFinder(depName, arrName);
      
      if (!depNodeId || !arrNodeId) return;

      const rawItems = await this.fetchTrainData(codes, depNodeId, arrNodeId, date);
      
      const processedItems = this.processTrainItems(rawItems, time);

      this.displayResults(processedItems, trainName, time);
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
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
