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

  findStation(station: string) {
    const keyword = station.toLowerCase().trim();

    return (
      trainData.nodeList
        .flatMap(region => Object.values(region).flat())
        .find(node => node.nodename.toLowerCase().trim() === keyword)
      || null
    );
  }

  stationList() {
    return trainData.nodeList.flatMap(region =>
      Object.values(region).flatMap(nodes =>
        nodes.map(node => node.nodename)
      )
    );
  }
}