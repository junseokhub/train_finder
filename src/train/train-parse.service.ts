import trainData from './train-data.json'
export class TrainParseService {
  constructor() {}


  async parseToNodeId(trainName: string): Promise<string[]> {
    const name = trainName.toLowerCase();
    
    if (name === 'ktx') {
      return ['00', '07', '10', '16', '19'];
    }
    
    if (name === 'srt') {
      return ['17'];
    }

    if (name === 'normal') {
      return ['01', '02', '03', '04', '06', '08', '09', '18'];
    }
    throw Error('The only valid train names: ktx, srt, normal');
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