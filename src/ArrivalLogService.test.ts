import ArrivalLogService from "./ArrivalLogService";
import ArrivalLog from "./dto/ArrivalLog";
import Captain from "./dto/Captain";
import Vessel from "./dto/Vessel";
import Port from "./dto/Port";
import mockDate, { resetDate } from './mocks/mockDate';

describe('ArrivalLogService.test.ts', () => {
  let sut;
  beforeEach(() => {
    sut = new ArrivalLogService();
  });

  it(`should save an arrival log so that it's retrievable`, () => {
    const originalDate = mockDate(new Date(0));
    sut.save(new ArrivalLog(new Captain('Janeway'), new Vessel('Voyager'), new Port('Earth')));
    const result = sut.list('Janeway');
    expect(result).toMatchSnapshot();
    resetDate(originalDate);
  });

  it('should list all logs when no captain name is supplied', () => {
    const originalDate = mockDate(new Date(1));
    sut.save(new ArrivalLog(new Captain('Janeway'), new Vessel('Voyager'), new Port('Earth')));
    sut.save(new ArrivalLog(new Captain('Janeway'), new Vessel('Voyager'), new Port('Mars')));
    sut.save(new ArrivalLog(new Captain('Janeway'), new Vessel('Voyager'), new Port('Jupiter')));
    const result = sut.list();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(3);
    expect(result).toMatchSnapshot();
    resetDate(originalDate);
  });

  it('should list all logs ordered descending by timestamp', () => {
    const originalDate = mockDate(new Date(0));
    sut.save(new ArrivalLog(new Captain('Janeway'), new Vessel('Voyager'), new Port('Earth')));
    mockDate(new Date(2));
    sut.save(new ArrivalLog(new Captain('Janeway'), new Vessel('Voyager'), new Port('Mars')));
    mockDate(new Date(1));
    sut.save(new ArrivalLog(new Captain('Janeway'), new Vessel('Voyager'), new Port('Jupiter')));
    const result = sut.list();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(3);
    expect(result[0].port.name).toEqual('Earth');
    expect(result[1].port.name).toEqual('Jupiter');
    expect(result[2].port.name).toEqual('Mars');
    resetDate(originalDate);
  });

});