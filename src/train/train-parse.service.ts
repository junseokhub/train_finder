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
      console.error('❌ Invalid train name:', trainName);
      console.log('Available train types:', trainNames.join(', '));
    }
    return match ? String(match.vehiclekndid) : '00';
  }

 async trainDepArrFinder(depName: string, arrName: string) {
  const depNode = await this.findStation(depName);
  const arrNode = await this.findStation(arrName);

  if (!depNode) {
    console.log(`Departure station "${depName}" could not be found. Please check the station name again.`);
  }

  if (!arrNode) {
    console.log(`Arrival station "${arrName}" could not be found. Please check the station name again.`);
  }

  const depNodeId = depNode.nodeid;
  const arrNodeId = arrNode.nodeid;

  return {
    depNodeId,
    arrNodeId,
  };
}

async findStation(station: String) {
  for (const region of trainData.nodeList) {
    const regionKey = Object.keys(region)[0];
    const nodes = region[regionKey];

    const foundStation = nodes.find(e => e.nodename.toLowerCase().trim() === station.toLowerCase().trim());

    if (foundStation) {
      return foundStation;
    }
  }
  return null;
}

async stationList() {
  const allStations = [];

  for (const region of trainData.nodeList) {
    const regionKey = Object.keys(region)[0];
    const nodes = region[regionKey];

    nodes.forEach(e => {
      allStations.push(e.nodename);
    });
  }
    return allStations;
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