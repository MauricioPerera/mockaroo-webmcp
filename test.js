const assert = require('assert');
const { DATA_TYPES, CATEGORIES } = require('./lib/dataTypes');
const { generateDataset, generateRecord } = require('./lib/generator');
const { toCSV, toJSON, toSQL, toExcel } = require('./lib/formatters');
const { getSchemas, getSchema } = require('./lib/storage');

console.log('--- TEST 1: Verifying Data Types Catalog ---');
console.log(`Loaded ${Object.keys(DATA_TYPES).length} data types across ${CATEGORIES.length} categories.`);
assert(Object.keys(DATA_TYPES).length >= 40, 'Should have at least 40 data types');

console.log('--- TEST 2: Testing Record Generation ---');
const testSchema = [
  { id: '1', name: 'id', type: 'row_number', blank: 0 },
  { id: '2', name: 'first_name', type: 'first_name', blank: 0 },
  { id: '3', name: 'last_name', type: 'last_name', blank: 0 },
  { id: '4', name: 'email', type: 'email', blank: 0 },
  { id: '5', name: 'age', type: 'integer', blank: 0, options: { min: 18, max: 99 } },
  { id: '6', name: 'full_email', type: 'formula', blank: 0, options: { formula: 'record.first_name.toLowerCase() + "." + record.last_name.toLowerCase() + "@test.com"' } },
  { id: '7', name: 'nullable_col', type: 'company_name', blank: 100 }
];

const recs = generateDataset(testSchema, 5);
assert.strictEqual(recs.length, 5, 'Should generate exactly 5 records');
assert.strictEqual(recs[0].id, 1, 'Row number should start at 1');
assert.strictEqual(recs[4].id, 5, 'Row number should be 5');
assert(recs[0].first_name, 'First name should be generated');
assert(recs[0].full_email.includes('@test.com'), 'Formula should have evaluated with first and last name');
assert.strictEqual(recs[0].nullable_col, null, '100% blank field should be null');
console.log('Sample generated record:', recs[0]);

console.log('--- TEST 3: Testing Export Formatters ---');
const csv = toCSV(recs, testSchema);
assert(csv.includes('first_name,last_name'), 'CSV must contain headers');
console.log('CSV output (first 2 lines):\n' + csv.split('\n').slice(0, 2).join('\n'));

const jsonStr = toJSON(recs);
const parsed = JSON.parse(jsonStr);
assert.strictEqual(parsed.length, 5, 'JSON must parse back to 5 records');
console.log('JSON output valid: YES');

const sql = toSQL(recs, testSchema, { tableName: 'users', dialect: 'postgres' });
assert(sql.includes('INSERT INTO "users"'), 'SQL must contain INSERT statement');
console.log('SQL output (preview):\n' + sql.slice(0, 150) + '...');

const xlsxBuf = toExcel(recs, testSchema);
assert(Buffer.isBuffer(xlsxBuf) && xlsxBuf.length > 500, 'Excel buffer must be generated');
console.log(`Excel .xlsx generated: ${xlsxBuf.length} bytes`);

console.log('--- TEST 4: Testing Presets Storage ---');
const schemas = getSchemas();
assert(schemas.users && schemas.ecommerce && schemas.transactions, 'Default presets must exist');
console.log('Default presets found:', Object.keys(schemas).join(', '));

console.log('--- ALL UNIT TESTS PASSED SUCCESSFULLY! ---');
