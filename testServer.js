const assert = require('assert');
const http = require('http');

// Load express app from server.js
// Let's test on a custom port 3042 so it does not collide
process.env.PORT = 3042;
require('./server.js');

// Give server 500ms to bind
setTimeout(async () => {
  try {
    const baseUrl = 'http://localhost:3042';

    console.log('--- HTTP TEST 1: GET / (Homepage) ---');
    const homeRes = await fetch(`${baseUrl}/`);
    assert.strictEqual(homeRes.status, 200, 'Homepage should return 200');
    const homeHtml = await homeRes.text();
    assert(homeHtml.includes('mockaroo'), 'Homepage should contain mockaroo header');
    assert(homeHtml.includes('id="fields-container"'), 'Should render fields container');
    console.log('GET / passed (HTTP 200)');

    console.log('--- HTTP TEST 2: POST /fields/add (HTMX add row) ---');
    const addRes = await fetch(`${baseUrl}/fields/add`, { method: 'POST' });
    assert.strictEqual(addRes.status, 200, 'Add field should return 200');
    const addHtml = await addRes.text();
    assert(addHtml.includes('field-row'), 'Should return field-row partial');
    console.log('POST /fields/add passed (HTTP 200)');

    console.log('--- HTTP TEST 3: POST /preview (HTMX preview modal) ---');
    const params = new URLSearchParams();
    params.append('field_id[]', '1');
    params.append('field_name[]', 'id');
    params.append('field_type[]', 'row_number');
    params.append('field_blank[]', '0');
    params.append('field_id[]', '2');
    params.append('field_name[]', 'full_name');
    params.append('field_type[]', 'full_name');
    params.append('field_blank[]', '0');

    const prevRes = await fetch(`${baseUrl}/preview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    assert.strictEqual(prevRes.status, 200, 'Preview should return 200');
    const prevHtml = await prevRes.text();
    assert(prevHtml.includes('preview-modal'), 'Should render preview-modal');
    assert(prevHtml.includes('full_name'), 'Should include columns in preview');
    console.log('POST /preview passed (HTTP 200)');

    console.log('--- HTTP TEST 4: POST /generate (CSV Export) ---');
    params.append('num_rows', '20');
    params.append('file_format', 'csv');
    params.append('csv_delimiter', ',');
    const genRes = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    assert.strictEqual(genRes.status, 200, 'Generate CSV should return 200');
    assert.strictEqual(genRes.headers.get('content-type'), 'text/csv; charset=utf-8');
    const csvData = await genRes.text();
    const csvLines = csvData.trim().split('\n');
    assert.strictEqual(csvLines.length, 21, 'CSV should have 1 header + 20 data rows');
    console.log('POST /generate (CSV 20 rows) passed');

    console.log('--- HTTP TEST 5: GET /api/mock/users (Mock REST API) ---');
    const mockRes = await fetch(`${baseUrl}/api/mock/users?count=3`);
    assert.strictEqual(mockRes.status, 200, 'Mock API should return 200');
    const mockJson = await mockRes.json();
    assert.strictEqual(mockJson.length, 3, 'Should return 3 mock records');
    assert(mockJson[0].email, 'Mock user should have email');
    console.log('GET /api/mock/users?count=3 passed:\n', mockJson[0]);

    console.log('\n===========================================');
    console.log('🎉 ALL INTEGRATION & HTTP TESTS PASSED! 🎉');
    console.log('===========================================');
    process.exit(0);
  } catch (err) {
    console.error('Test failed with error:', err);
    process.exit(1);
  }
}, 600);
