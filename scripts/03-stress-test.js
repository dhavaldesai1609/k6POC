/**
 * 03 - Stress Test
 *
 * Purpose: Gradually increase load beyond expected capacity to find the breaking point.
 * Useful for capacity planning and identifying bottlenecks.
 *
 * Run: k6 run scripts/03-stress-test.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Below normal load
    { duration: '1m',  target: 20 },
    { duration: '30s', target: 50 },   // Around breaking point
    { duration: '1m',  target: 50 },
    { duration: '30s', target: 100 },  // Beyond capacity
    { duration: '1m',  target: 100 },
    { duration: '1m',  target: 0 },    // Recovery
  ],
};

const BASE_URL = __ENV.BASE_URL || 'https://httpbin.org';

export default function () {
  const res = http.get(`${BASE_URL}/get`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}
