import { getTotalTime } from './pomodoro';

describe('Pomodoro utils', () => {
  describe('getTotalTime', () => {
    it('should return 59min (not 60min)', () => {
      const testTime = 3600 + 3599;

      const result = getTotalTime(testTime);

      expect(result.minutes).toBe(59);
    });
  });
});
