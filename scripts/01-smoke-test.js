/**
 * 01 - Smoke Test
 *
 * Purpose: Verify that the system is up and responds correctly under minimal load.
 * Use this as a quick health check before running heavier tests.
 *
 * Run: k6 run scripts/01-smoke-test.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,           // 1 virtual user
  duration: '30s',  // run for 30 seconds
};

const BASE_URL = __ENV.BASE_URL || 'https://httpbin.org';

export default function () {
  // Simple GET request
  const res = http.get(`${BASE_URL}/get`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'body contains url': (r) => r.body.includes('httpbin'),
  });

  sleep(1); // think time
}
