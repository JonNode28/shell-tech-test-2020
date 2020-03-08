import ArrivalLog from "./dto/ArrivalLog";

export default class ArrivalLogService {
  arrivalLogs: Array<ArrivalLog> = new Array<ArrivalLog>();
  timestamp: Date = new Date();
  save(arrivalLog: ArrivalLog) {
    this.arrivalLogs.push(arrivalLog);
  }
  list(captainName: string): Array<ArrivalLog>{
    const result = captainName ? this.arrivalLogs
      .filter(log => log.captain.name === captainName) : this.arrivalLogs;

    return result
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
}