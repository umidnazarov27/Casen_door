import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { demoCatalogue } from '../../../fixtures/catalogue';
import { createDemoService } from './service';

function json(response: ServerResponse, status: number, body: unknown) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(body));
}

async function readBody(request: IncomingMessage) {
  let body = '';
  for await (const chunk of request) {
    body += chunk.toString();
    if (Buffer.byteLength(body) > 16_384) throw new Error('Request is too large');
  }
  return JSON.parse(body);
}

export function startLocalApi(port = 3001) {
  if (process.env.NODE_ENV === 'production') throw new Error('The fixture API must not run in production');
  const service = createDemoService();
  const server = createServer(async (request, response) => {
    response.setHeader('Referrer-Policy', 'no-referrer');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    const url = new URL(request.url ?? '/', 'http://127.0.0.1');
    try {
      if (request.method === 'GET' && url.pathname === '/api/catalogue') return json(response, 200, demoCatalogue);
      const asset = /^\/demo-assets\/(kitchen-reference|storage-reference)\.png$/.exec(url.pathname);
      if (request.method === 'GET' && asset) {
        const path = fileURLToPath(new URL(`../../../fixtures/images/${asset[1]}.png`, import.meta.url));
        const bytes = await readFile(path);
        response.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600' });
        response.end(bytes); return;
      }
      if (request.method === 'POST' && url.pathname === '/api/quotes') {
        if (request.headers.origin && !['http://127.0.0.1:5173', 'http://localhost:5173'].includes(request.headers.origin)) return json(response, 403, { error: 'Unsupported origin' });
        const result = await service.create(await readBody(request));
        return json(response, 201, { id: result.id, quote: result.quote, pdfUrl: `/api/quotes/${result.id}/pdf?token=${result.token}` });
      }
      const pdf = /^\/api\/quotes\/([a-f0-9-]+)\/pdf$/.exec(url.pathname);
      if (request.method === 'GET' && pdf) {
        const record = service.read(pdf[1], url.searchParams.get('token') ?? '');
        response.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Disposition': 'inline; filename="casen-demo-quotation.pdf"', 'Cache-Control': 'private, no-store' });
        response.end(record.pdf); return;
      }
      json(response, 404, { error: 'Route not found' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to generate quotation';
      json(response, url.pathname.endsWith('/pdf') ? 404 : 400, { error: message });
    }
  });
  server.listen(port, '127.0.0.1');
  return server;
}
