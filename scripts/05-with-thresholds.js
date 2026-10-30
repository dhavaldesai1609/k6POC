/**
 * 05 - Thresholds & Custom Metrics
 *
 * Purpose: Define Service Level Objectives (SLOs) as thresholds.
 * The test fails if any threshold is breached.
 * Also demonstrates a custom Trend metric.
 *
 * Run: k6 run scripts/05-with-thresholds.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// Custom metrics
const loginDuration = new Trend('login_duration');
const errorRate = new Rate('errors');
const successfulRequests = new Counter('successful_requests');

export const options = {
  vus: 5,
  duration: '1m',

  thresholds: {
    // 95% of requests must complete below 500ms
    http_req_duration: ['p(95)<500'],

    // Error rate must be below 1%
    errors: ['rate<0.01'],

    // At least 95% of checks must pass
    checks: ['rate>0.95'],

    // Custom metric threshold
    login_duration: ['p(95)<800'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://httpbin.org';

export default function () {
  // Simulate a "login" request (POST)
  const payload = JSON.stringify({
    username: 'testuser',
    password: 'secret',
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const start = Date.now();
  const res = http.post(`${BASE_URL}/post`, payload, params);
  loginDuration.add(Date.now() - start);

  const success = check(res, {
    'status is 200': (r) => r.status === 200,
    'has json body': (r) => r.json() !== null,
  });

  if (success) {
    successfulRequests.add(1);
  } else {
    errorRate.add(1);
  }

  sleep(1);
}
