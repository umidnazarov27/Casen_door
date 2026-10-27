import { createServer } from 'vite';
import { startLocalApi } from '../apps/api/src/local-server';

const api = startLocalApi();
const frontend = await createServer({ configFile: 'apps/configurator/vite.config.ts' });
await frontend.listen();
frontend.printUrls();
console.log('Local fixture API: http://127.0.0.1:3001 (no Shopify connection or email delivery)');
const close = async () => { api.close(); await frontend.close(); process.exit(0); };
process.on('SIGINT', close);
process.on('SIGTERM', close);
