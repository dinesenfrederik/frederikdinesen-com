'use client';

import { useActionState } from 'react';
import { login } from '../actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="w-full max-w-sm rounded-2xl border border-border bg-zinc-950 p-6 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Review-dashboard</h1>
        <p className="text-sm text-zinc-400 mt-1">Log ind for at gennemgå nye blogartikler.</p>
      </div>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Adgangskode"
        required
        autoFocus
        className="w-full rounded-lg border border-border bg-black px-3 py-2.5 focus:outline-none focus:border-amber"
      />
      {state?.error && <p className="text-sm text-red-300">{state.error}</p>}
      <button disabled={pending} className="w-full rounded-lg bg-amber py-2.5 font-bold text-black hover:bg-amber-hover disabled:opacity-60">
        {pending ? 'Logger ind…' : 'Log ind'}
      </button>
    </form>
  );
}
