import { ENDPOINT, listAllTools, withPublicClient } from '../lib/connection.mjs';

const args = process.argv.slice(2);
if (args.some(arg => arg !== '--schemas') || args.length > 1) {
  console.error('Usage: node examples/discover.mjs [--schemas]');
  process.exitCode = 1;
} else {
  try {
    const report = await withPublicClient(async client => {
      const tools = await listAllTools(client);
      return {
        checkedAt: new Date().toISOString(), endpoint: ENDPOINT,
        server: client.getServerVersion(),
        tools: args.includes('--schemas') ? tools : tools.map(({ name, title }) => ({ name, title })),
        scope: 'Public discovery only; no tools called and no search links opened.',
      };
    });
    console.log(JSON.stringify(report, null, 2));
  } catch {
    console.error('Public MCP discovery failed. Check connectivity and the official guide at https://mubboo.flights/mcp. No credentials are needed.');
    process.exitCode = 1;
  }
}
