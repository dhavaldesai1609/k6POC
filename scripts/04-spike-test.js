/**
 * 04 - Spike Test
 *
 * Purpose: Suddenly increase the number of VUs to simulate traffic spikes
 * (e.g. flash sale, viral post, marketing campaign).
 *
 * Run: k6 run scripts/04-spike-test.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },    // Baseline
    { duration: '10s', target: 100 },  // Sudden spike
    { duration: '30s', target: 100 },  // Hold the spike
    { duration: '10s', target: 5 },    // Scale back down
    { duration: '20s', target: 5 },    // Recovery observation
    { duration: '10s', target: 0 },
  ],
};

const BASE_URL = __ENV.BASE_URL || 'https://httpbin.org';

export default function () {
  const res = http.get(`${BASE_URL}/get`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(0.5);
}
