import trainData from './train-data.json'
export class TrainParseService {
  constructor() {}

  async trainList() {
    const trainList = trainData.trainNames;
    trainList.forEach(train => {
      console.log(train);
    });
  }

  async parseToNodeId(trainName: string) {
    const trainNames = trainData.trainNames;
    const vehicleMapping = trainData.vehicleMapping;
    const match = vehicleMapping.find(v =>
      v.vehiclekndnm.replace(/-/g, '').toLowerCase() === trainName.toLowerCase()
    );

    if (!match) {
      console.error("❌ 잘못된 기차 이름:", trainName);
      console.log("입력 가능 전체 기차종류:", trainNames.join(', '));
    }

    return match ? String(match.vehiclekndid) : '00';
  }

  async trainDepArrFinder(depName: string, arrName: string) {
    const nodeList = trainData.nodeList;

    const depNode = nodeList.find((node) => node.nodename.toLowerCase().trim() === depName.toLowerCase().trim());
    const arrNode = nodeList.find((node) => node.nodename.toLowerCase().trim() === arrName.toLowerCase().trim());

    if (!depNode) {
      return { error: `출발역 "${depName}"을(를) 찾을 수 없습니다. 역명을 다시 확인해 주세요.` };
    }
    if (!arrNode) {
      return { error: `도착역 "${arrName}"을(를) 찾을 수 없습니다. 역명을 다시 확인해 주세요.` };
    }


    const depNodeId = depNode ? depNode.nodeid : null;
    const arrNodeId = arrNode ? arrNode.nodeid : null;
    return {
      depNodeId,
      arrNodeId,
    }
  }

  async findStation(station: String) {
    return trainData.nodeList.find(e => e.nodename === station || null);
  }

  async stationList() {
    const stationList = trainData.nodeList;

    return stationList.forEach(e => {
      console.log(e.nodename);
    });
  }
}




  //   "ktx",
  //   "새마을호",
  //   "무궁화호",
  //   "누리로",
  //   "ktx산천A",
  //   "itx새마을",
  //   "itx청춘",
  //   "ktx산천B",
  //   "ktx이음",
  //   "srt",
  //   "itx마음",
  //   "ktx청룡"
  // "vehicleMapping": [
  //   { "vehiclekndid": "00", "vehiclekndnm": "KTX" },
  //   { "vehiclekndid": "01", "vehiclekndnm": "새마을호" },
  //   { "vehiclekndid": "02", "vehiclekndnm": "무궁화호" },
  //   { "vehiclekndid": "04", "vehiclekndnm": "누리로" },
  //   { "vehiclekndid": "07", "vehiclekndnm": "KTX-산천(A-type)" },
  //   { "vehiclekndid": "08", "vehiclekndnm": "ITX-새마을" },
  //   { "vehiclekndid": "09", "vehiclekndnm": "ITX-청춘" },
  //   { "vehiclekndid": "10", "vehiclekndnm": "KTX-산천(B-type)" },
  //   { "vehiclekndid": "16", "vehiclekndnm": "KTX-이음" },
  //   { "vehiclekndid": "17", "vehiclekndnm": "SRT" },
  //   { "vehiclekndid": "18", "vehiclekndnm": "ITX-마음" },
  //   { "vehiclekndid": "19", "vehiclekndnm": "KTX-청룡" }]