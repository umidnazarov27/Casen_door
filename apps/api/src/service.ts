import { randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { configurationSchema, createQuotation, type Quotation } from '@casen/domain';
import { renderQuotation } from '@casen/pdf';
import { demoCatalogue } from '../../../fixtures/catalogue';

const requestSchema = z.object({
  selection: configurationSchema, catalogueRevision: z.string(), requestKey: z.string().min(8).max(100),
}).strict();
type Record = { id: string; token: string; quote: Quotation; pdf: Buffer; createdAt: number };
const referencePath = fileURLToPath(new URL('../../../fixtures/images/kitchen-reference.png', import.meta.url));

/** Local-only store. Production requires durable storage and Shopify authentication. */
export function createDemoService() {
  const records = new Map<string, Record>();
  const requests = new Map<string, { fingerprint: string; promise: Promise<Record> }>();

  async function create(raw: unknown) {
    const input = requestSchema.parse(raw);
    if (input.catalogueRevision !== demoCatalogue.revision) throw new Error('The catalogue changed. Review your configuration.');
    const canonical = { ...input.selection, storageIds: [...input.selection.storageIds].sort() };
    const fingerprint = JSON.stringify(canonical);
    const existing = requests.get(input.requestKey);
    if (existing && existing.fingerprint !== fingerprint) throw new Error('Request key reused with different content');
    if (existing) return existing.promise;
    if (requests.size >= 100) throw new Error('Demo quotation limit reached. Restart the local server.');
    const promise = generate(canonical);
    requests.set(input.requestKey, { fingerprint, promise });
    try { return await promise; }
    catch (error) { requests.delete(input.requestKey); throw error; }
  }

  async function generate(selection: z.infer<typeof configurationSchema>) {
    const quote = createQuotation(demoCatalogue, selection, new Date());
    const pdf = await renderQuotation(quote, referencePath);
    const record = { id: randomUUID(), token: randomBytes(24).toString('hex'), quote, pdf, createdAt: Date.now() };
    records.set(record.id, record);
    return record;
  }

  function read(id: string, token: string) {
    const record = records.get(id);
    const supplied = Buffer.from(token);
    if (!record || supplied.length !== 48 || !timingSafeEqual(Buffer.from(record.token), supplied)) throw new Error('Quotation not found');
    if (Date.now() - record.createdAt > 3_600_000) throw new Error('Demo download expired. Generate the quotation again.');
    return record;
  }

  return { create, read };
}
