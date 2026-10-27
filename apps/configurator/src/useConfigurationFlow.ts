import { useReducer, useRef, useState } from 'react';
import { calculatePrice, changeSelection, initialSelection, type Catalogue, type SelectionChange } from '@casen/domain';

export const configurationSteps = ['Layout', 'Island', 'Storage', 'Carcass'];

/** Shared behaviour for the original prototype and the client design concepts. */
export function useConfigurationFlow(catalogue: Catalogue, apiBase: string) {
  const [state, dispatch] = useReducer((state: ReturnType<typeof changeSelection>, change: SelectionChange) => changeSelection(catalogue, state.selection, change), { selection: { ...initialSelection, layoutId: catalogue.layouts.find(item => item.active)?.id ?? null }, notices: [] });
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const requestKey = useRef<string | null>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const { selection } = state;
  const price = selection.layoutId ? calculatePrice(catalogue, selection, false) : null;
  const canContinue = step === 0 ? Boolean(selection.layoutId) : step === 1 ? Boolean(selection.islandId) : step === 2 || Boolean(selection.carcassId);
  const maxStep = !selection.layoutId ? 0 : !selection.islandId ? 1 : 3;
  const layout = catalogue.layouts.find(item => item.id === selection.layoutId);

  function select(change: SelectionChange) {
    dispatch(change); setError(''); setPdfUrl(''); requestKey.current = null;
  }
  function navigate(next: number) {
    setStep(next);
    requestAnimationFrame(() => title.current?.focus({ preventScroll: true }));
  }
  async function fileQuotation() {
    const tab = window.open('about:blank', '_blank');
    if (tab) { tab.opener = null; tab.document.title = 'Preparing quotation'; tab.document.body.textContent = 'Preparing your quotation…'; }
    setBusy(true); setError('');
    requestKey.current ??= crypto.randomUUID();
    try {
      const response = await fetch(`${apiBase}/quotes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ selection, catalogueRevision: catalogue.revision, requestKey: requestKey.current }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to generate PDF');
      if (typeof result.pdfUrl !== 'string' || !result.pdfUrl.startsWith(`${apiBase}/quotes/`)) throw new Error('Invalid quotation response');
      setPdfUrl(result.pdfUrl);
      if (tab) tab.location.replace(result.pdfUrl);
    } catch (error) { tab?.close(); setError(error instanceof Error ? error.message : 'Unable to generate quotation. Please retry.'); }
    finally { setBusy(false); }
  }
  return { state, selection, step, busy, error, pdfUrl, title, price, canContinue, maxStep, layout, select, navigate, fileQuotation };
}
