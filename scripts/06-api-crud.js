/**
 * 06 - API CRUD Flow
 *
 * Purpose: Demonstrate a realistic multi-step user journey:
 * CREATE → READ → UPDATE → DELETE against a public test API.
 * Uses https://jsonplaceholder.typicode.com (free fake REST API).
 *
 * Run: k6 run scripts/06-api-crud.js
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Load shared test data (executed once per VU)
const users = new SharedArray('users', function () {
  return JSON.parse(open('../data/users.json'));
});

export const options = {
  stages: [
    { duration: '20s', target: 5 },
    { duration: '40s', target: 5 },
    { duration: '20s', target: 0 },
  ],
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  // Pick a random user from the data file
  const user = users[Math.floor(Math.random() * users.length)];
  let postId;

  group('Create Post', function () {
    const payload = JSON.stringify({
      title: `Load test post by ${user.name}`,
      body: 'This is a generated post from k6 POC',
      userId: user.id,
    });

    const res = http.post(`${BASE_URL}/posts`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'create status is 201': (r) => r.status === 201,
      'create has id': (r) => r.json('id') !== undefined,
    });

    postId = res.json('id');
  });

  sleep(0.5);

  group('Read Post', function () {
    // jsonplaceholder returns posts 1-100; we use a fixed id for read
    const res = http.get(`${BASE_URL}/posts/1`);

    check(res, {
      'read status is 200': (r) => r.status === 200,
      'read has title': (r) => r.json('title') !== undefined,
    });
  });

  sleep(0.5);

  group('Update Post', function () {
    const payload = JSON.stringify({
      title: 'Updated title from k6',
      body: 'Updated body',
      userId: user.id,
    });

    const res = http.put(`${BASE_URL}/posts/1`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'update status is 200': (r) => r.status === 200,
    });
  });

  sleep(0.5);

  group('Delete Post', function () {
    const res = http.del(`${BASE_URL}/posts/1`);

    check(res, {
      'delete status is 200': (r) => r.status === 200,
    });
  });

  sleep(1);
}
