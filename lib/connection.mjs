import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

export const ENDPOINT = 'https://mubboo.flights/api/mcp';
export const EXPECTED_TOOLS = ['find_airports', 'get_service_info', 'prepare_flight_search'];
export const REQUEST_OPTIONS = { timeout: 15000, maxTotalTimeout: 15000 };
const MAX_BYTES = 1024 * 1024;

// Examples target only the public service. No credentials or local settings are read.
export function publicFetch(fetchImpl = fetch) {
  return async (input, init = {}) => {
    if (String(input) !== ENDPOINT) throw new Error('Unexpected endpoint');
    const headers = new Headers(init.headers);
    if (headers.has('authorization') || headers.has('cookie')) throw new Error('Credentials are not accepted');
    const signal = init.signal
      ? AbortSignal.any([init.signal, AbortSignal.timeout(15000)])
      : AbortSignal.timeout(15000);
    const response = await fetchImpl(ENDPOINT, { ...init, headers, signal, credentials: 'omit', redirect: 'error' });
    if (!response.body) return response;
    let bytes = 0;
    const bounded = response.body.pipeThrough(new TransformStream({
      transform(chunk, controller) {
        bytes += chunk.byteLength;
        if (bytes > MAX_BYTES) throw new Error('Response exceeds 1 MiB');
        controller.enqueue(chunk);
      },
    }));
    return new Response(bounded, { status: response.status, statusText: response.statusText, headers: response.headers });
  };
}

export function validateTools(tools) {
  if (!Array.isArray(tools)) throw new Error('Missing tools list');
  const names = tools.map(tool => tool.name).sort();
  if (JSON.stringify(names) !== JSON.stringify(EXPECTED_TOOLS)) throw new Error('Unexpected tool inventory');
  for (const tool of tools) {
    if (tool.inputSchema?.type !== 'object' || !tool.description) throw new Error('Incomplete tool schema');
    if (tool.annotations?.readOnlyHint !== true || tool.annotations?.destructiveHint !== false) {
      throw new Error('Tool safety annotations changed');
    }
  }
  return names;
}

export async function listAllTools(client) {
  const tools = [];
  const seen = new Set();
  let cursor;
  for (let page = 0; page < 5; page++) {
    const result = await client.listTools(cursor ? { cursor } : {}, REQUEST_OPTIONS);
    if (!Array.isArray(result.tools)) throw new Error('Missing tools list');
    tools.push(...result.tools);
    cursor = result.nextCursor;
    if (!cursor) { validateTools(tools); return tools; }
    if (seen.has(cursor)) throw new Error('Repeated pagination cursor');
    seen.add(cursor);
  }
  throw new Error('Tool pagination limit reached');
}

export async function withPublicClient(action) {
  const client = new Client({ name: 'mubboo-flights-public-examples', version: '0.1.0' });
  const transport = new StreamableHTTPClientTransport(new URL(ENDPOINT), {
    fetch: publicFetch(),
    reconnectionOptions: { maxRetries: 0, initialReconnectionDelay: 1000, maxReconnectionDelay: 1000, reconnectionDelayGrowFactor: 1 },
  });
  try {
    await client.connect(transport, REQUEST_OPTIONS);
    return await action(client);
  } finally {
    await client.close();
  }
}

export function clientConfig(format = 'portable') {
  if (format === 'vscode') return { servers: { 'mubboo-flights': { type: 'http', url: ENDPOINT } } };
  if (format === 'portable') return { mcpServers: { 'mubboo-flights': { url: ENDPOINT } } };
  throw new Error('Use portable or vscode');
}
