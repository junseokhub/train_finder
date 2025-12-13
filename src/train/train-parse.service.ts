import trainData from './train-data.json'
export class TrainParseService {
  constructor() {}

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

    const depNodeId = "";
    const arrNodeId = "";
    return {
      depNodeId,
      arrNodeId,
    }

  }
}