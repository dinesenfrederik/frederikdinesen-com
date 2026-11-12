'use client';

import { useActionState } from 'react';
import { orderArticle } from '../actions';

export default function OrderForm() {
  const [state, action, pending] = useActionState(orderArticle, undefined);
  return (
    <form action={action} className="flex flex-col sm:flex-row gap-3">
      <input
        name="topic"
        placeholder="Fx: Kompression og EQ til moderne rock-trommer"
        className="flex-1 rounded-lg border border-border bg-black px-3 py-2.5 focus:outline-none focus:border-amber"
        required
        minLength={5}
        maxLength={300}
      />
      <button disabled={pending} className="rounded-lg border border-amber/60 px-4 py-2.5 text-sm font-semibold text-amber hover:bg-amber/10 disabled:opacity-60">
        {pending ? 'Bestiller…' : 'Skriv artiklen'}
      </button>
      {state && (
        <p className={`sm:basis-full text-sm ${state.ok ? 'text-emerald-300' : 'text-red-300'}`}>{state.ok ? state.message : state.error}</p>
      )}
    </form>
  );
}
