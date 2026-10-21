import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { clientConfig, ENDPOINT, EXPECTED_TOOLS, listAllTools, publicFetch, validateTools } from '../lib/connection.mjs';

const fixture = () => EXPECTED_TOOLS.map(name => ({ name, description: 'Example', inputSchema: { type: 'object' }, annotations: { readOnlyHint: true, destructiveHint: false } }));

test('discovery fails closed on missing, duplicate or additional tools', () => {
  assert.deepEqual(validateTools(fixture()), EXPECTED_TOOLS);
  for (const tools of [fixture().slice(1), [...fixture(), fixture()[0]], [...fixture(), { name: 'book' }]]) {
    assert.throws(() => validateTools(tools), /inventory/);
  }
});
test('changed safety metadata and missing schemas fail validation', () => {
  const tools = fixture(); tools[0].annotations.readOnlyHint = false;
  assert.throws(() => validateTools(tools), /annotations/);
  delete tools[0].inputSchema;
  assert.throws(() => validateTools(tools), /schema/);
});
test('paginated tools are combined and repeated cursors fail', async () => {
  const pages = [{ tools: fixture().slice(0, 1), nextCursor: 'next' }, { tools: fixture().slice(1) }];
  assert.equal((await listAllTools({ listTools: async () => pages.shift() })).length, 3);
  await assert.rejects(listAllTools({ listTools: async () => ({ tools: [], nextCursor: 'same' }) }), /Repeated/);
});
test('pagination has a fixed upper bound', async () => {
  let count = 0;
  await assert.rejects(listAllTools({ listTools: async () => ({ tools: [], nextCursor: String(++count) }) }), /limit/);
  assert.equal(count, 5);
});
test('network wrapper rejects other endpoints and credentials before fetching', async () => {
  let calls = 0;
  const request = publicFetch(async () => { calls++; return new Response('{}'); });
  await assert.rejects(request('https://example.com'), /endpoint/);
  await assert.rejects(request(ENDPOINT, { headers: { Authorization: 'test-fixture' } }), /Credentials/);
  await assert.rejects(request(ENDPOINT, { headers: { Cookie: 'test-fixture' } }), /Credentials/);
  assert.equal(calls, 0);
});
test('requests omit credentials, reject redirects and cap response size', async () => {
  const request = publicFetch(async (url, init) => {
    assert.equal(url, ENDPOINT); assert.equal(init.credentials, 'omit'); assert.equal(init.redirect, 'error');
    assert.ok(init.signal); return new Response('x'.repeat(1024 * 1024 + 1));
  });
  await assert.rejects((await request(ENDPOINT)).text(), /1 MiB/);
});
test('configuration formats point to the hosted service without credentials', () => {
  assert.equal(clientConfig().mcpServers['mubboo-flights'].url, ENDPOINT);
  assert.equal(clientConfig('vscode').servers['mubboo-flights'].type, 'http');
  assert.throws(() => clientConfig('unknown'), /portable or vscode/);
});
test('published snapshot and descriptor agree with the official endpoint', async () => {
  const snapshot = JSON.parse(await readFile(new URL('../tools.json', import.meta.url), 'utf8'));
  const descriptor = JSON.parse(await readFile(new URL('../server.json', import.meta.url), 'utf8'));
  assert.equal(snapshot.endpoint, ENDPOINT);
  validateTools(snapshot.tools);
  assert.equal(descriptor.remotes[0].url, ENDPOINT);
  assert.equal(descriptor.name, 'flights.mubboo/flight-search');
  assert.equal(descriptor.version, snapshot.server.version);
});
