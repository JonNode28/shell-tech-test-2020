const mockDate = (expected: Date) => {
  const _Date = Date;

  function MockDate(mockOverride?: Date | number) {
    return new _Date(mockOverride || expected)
  }

  MockDate.UTC = _Date.UTC;
  MockDate.parse = _Date.parse;
  MockDate.now = () => expected.getTime();
  MockDate.prototype = _Date.prototype;

  global.Date = MockDate as any;

  return _Date;
};

export default mockDate;

export const resetDate = (originalDate: any) => {
  global.Date = Date;
};