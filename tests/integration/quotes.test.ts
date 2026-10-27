import { describe, expect, it } from 'vitest';
import { createDemoService } from '../../apps/api/src/service';
import { demoCatalogue } from '../../fixtures/catalogue';

const input = { selection: { layoutId: 'single', islandId: 'none', storageIds: [], carcassId: 'white' }, catalogueRevision: 'demo-v1', requestKey: 'test-request-001' };

describe('local quotation service', () => {
  it('generates a real PDF from trusted fixture prices and allows token-scoped retrieval', async () => {
    const service = createDemoService();
    const result = await service.create(input);
    expect(result.quote.price.total).toBe(960_000);
    const file = service.read(result.id, result.token);
    expect(file.pdf.subarray(0, 5).toString()).toBe('%PDF-');
    expect(() => service.read(result.id, 'wrong-token')).toThrow();
  });
  it('deduplicates simultaneous retries and rejects changed content using the same key', async () => {
    const service = createDemoService();
    const [first, second] = await Promise.all([service.create(input), service.create(input)]);
    expect(second.id).toBe(first.id);
    await expect(service.create({ ...input, selection: { ...input.selection, carcassId: 'oak' } })).rejects.toThrow(/different/);
  });
  it('rejects stale catalogue revisions and browser-supplied prices', async () => {
    const service = createDemoService();
    await expect(service.create({ ...input, catalogueRevision: 'old' })).rejects.toThrow(/changed/);
    await expect(service.create({ ...input, price: 1 })).rejects.toThrow();
    expect(demoCatalogue.demo).toBe(true);
  });
});
