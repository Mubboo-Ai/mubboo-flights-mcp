import { clientConfig } from '../lib/connection.mjs';
try {
  if (process.argv.length > 3) throw new Error('Unexpected arguments');
  console.log(JSON.stringify(clientConfig(process.argv[2] || 'portable'), null, 2));
} catch {
  console.error('Usage: node examples/config.mjs [portable|vscode]');
  process.exitCode = 1;
}
