import { getTotalTime } from './timeHelpers';

describe('Time helpers', () => {
  describe('getTotalTime', () => {
    it('should return 59min (not 60min)', () => {
      const testTime = 3600 + 3599;

      const result = getTotalTime(testTime);

      expect(result.minutes).toBe(59);
    });
  });
});
