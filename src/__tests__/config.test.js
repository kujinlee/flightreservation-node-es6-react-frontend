import { BASE_URL } from '../config';

describe('Frontend Config', () => {
  it('should use the correct BASE_URL', () => {
    expect(BASE_URL).toBe('/flightreservation-node-es6-backend');
  });
});
