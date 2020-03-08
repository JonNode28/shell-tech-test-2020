import Captain from "./dto/Captain";

export default class CaptainService {
  captains: Array<Captain> = new Array<Captain>();
  save(captain: Captain) {
    if(this.captains.some(c => c.name === captain.name)) return;
    this.captains.push(captain);
  }
  list(captainName: string): Array<Captain> {
    return captainName ? this.captains.filter(c => c.name === captainName) : this.captains;
  }
}