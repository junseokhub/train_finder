import axios from 'axios';
import { TrainParseService } from './train-parse.service';

export class TrainService {
  private serviceKey = 'd2a259fae046ba1b65a3c083fdd80de2a781e37eb27f939d758af1de25f606f9';
  constructor(
    private readonly trainParseService: TrainParseService
  ) {}

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

  async searchTrain(depPlaceId: string, arrPlaceId: string, date: string) {
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo';
    this.today(date);

    const params = new URLSearchParams({
      serviceKey: this.serviceKey,
      _type: 'json',
      depPlaceId,
      arrPlaceId,
      depPlandTime: date,
      trainGradeCode: '00',
    });

    const response = await axios.get(`${url}?${params.toString()}`, { responseType: 'json' });
    return response.data?.response?.body?.items?.item || [];
  }

  async cityCodeList() {
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList';

    const params = new URLSearchParams({
      serviceKey: this.serviceKey,
      _type: 'json',
      cityCode: '11',
    });

    const response = await axios.get(`${url}?${params.toString()}`, { responseType: 'json' });
    return response.data?.response?.body?.items?.item || [];
  }

  async test() {
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getVhcleKndList'

    const params = new URLSearchParams({
      serviceKey: this.serviceKey,
      _type: 'json',
    });

    const response = await axios.get(`${url}?${params.toString()}`, { responseType: 'json' });
    return response.data?.response?.body?.items?.item || [];
  }
}
