import Captain from './Captain';
import Vessel from "./Vessel";
import Port from "./Port";

export default class ArrivalLog {
  readonly captain: Captain;
  readonly vessel: Vessel;
  readonly port: Port;
  readonly timestamp: Date;
  constructor(captain: Captain, vessel: Vessel, port: Port) {
    this.captain = captain;
    this.vessel = vessel;
    this.port = port;
    this.timestamp = new Date()
  }
}