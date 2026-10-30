/**
 * 02 - Load Test
 *
 * Purpose: Simulate expected normal traffic with controlled ramp-up and ramp-down.
 * Stages help model realistic user arrival patterns.
 *
 * Run: k6 run scripts/02-load-test.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp-up to 10 VUs
    { duration: '1m',  target: 10 },  // Stay at 10 VUs
    { duration: '30s', target: 0  },  // Ramp-down to 0
  ],
};

const BASE_URL = __ENV.BASE_URL || 'https://httpbin.org';

export default function () {
  const res = http.get(`${BASE_URL}/get`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1s': (r) => r.timings.duration < 1000,
  });

  // Simulate user think time
  sleep(Math.random() * 2 + 1); // 1-3 seconds
}
