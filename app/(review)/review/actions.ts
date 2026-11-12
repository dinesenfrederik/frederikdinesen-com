'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { checkPasswordAndStartSession, endSession, requireAuth } from './_lib/auth';
import {
  orderArticle as orderArticleOnGitHub,
  publishDraft as publishOnGitHub,
  rejectDraft as rejectOnGitHub,
  revertBacklink as revertOnGitHub,
  saveArticle as saveOnGitHub,
  type FaqItem,
} from './_lib/drafts';

export type ActionResult = { ok: true; message?: string; sha?: string } | { ok: false; error: string };

const fail = (e: unknown): ActionResult => ({ ok: false, error: e instanceof Error ? e.message : String(e) });
const prNumber = (v: unknown) => {
  const n = Number(v);
  if (!Number.isInteger(n) || n <= 0) throw new Error('Ugyldig kladde.');
  return n;
};

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get('password') ?? '');
  const ok = await checkPasswordAndStartSession(password);
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { error: 'Forkert adgangskode.' };
  }
  redirect('/review');
}

export async function logout() {
  await endSession();
  redirect('/review');
}

export async function saveArticle(input: {
  pr: number;
  path: string;
  sha: string;
  title: string;
  description: string;
  faq: FaqItem[];
  body: string;
}): Promise<ActionResult> {
  try {
    await requireAuth();
    if (!input.title.trim() || !input.description.trim() || !input.body.trim()) {
      return { ok: false, error: 'Titel, beskrivelse og tekst skal udfyldes.' };
    }
    if (input.body.length > 200_000) return { ok: false, error: 'Teksten er for lang.' };
    const faq = (Array.isArray(input.faq) ? input.faq : [])
      .slice(0, 10)
      .map((f) => ({ question: String(f?.question ?? ''), answer: String(f?.answer ?? '') }));
    const sha = await saveOnGitHub(prNumber(input.pr), String(input.path), String(input.sha), {
      title: String(input.title),
      description: String(input.description),
      faq,
      body: String(input.body),
    });
    return { ok: true, sha, message: 'Gemt' };
  } catch (e) {
    return fail(e);
  }
}

export async function removeBacklink(pr: number, path: string): Promise<ActionResult> {
  try {
    await requireAuth();
    await revertOnGitHub(prNumber(pr), String(path));
    revalidatePath(`/review/${pr}`);
    return { ok: true, message: 'Linket er fjernet igen' };
  } catch (e) {
    return fail(e);
  }
}

export async function publishDraft(pr: number): Promise<ActionResult> {
  let n: number;
  try {
    await requireAuth();
    n = prNumber(pr);
    await publishOnGitHub(n);
  } catch (e) {
    return fail(e);
  }
  redirect(`/review?published=${n}`);
}

export async function rejectDraft(pr: number): Promise<ActionResult> {
  let n: number;
  try {
    await requireAuth();
    n = prNumber(pr);
    await rejectOnGitHub(n);
  } catch (e) {
    return fail(e);
  }
  redirect(`/review?rejected=${n}`);
}

export async function orderArticle(_prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  try {
    await requireAuth();
    const topic = String(formData.get('topic') ?? '').trim();
    if (topic.length < 5) return { ok: false, error: 'Skriv et emne på mindst 5 tegn.' };
    if (topic.length > 300) return { ok: false, error: 'Emnet er for langt.' };
    await orderArticleOnGitHub(topic);
    revalidatePath('/review');
    return { ok: true, message: 'Bestilt! Kladden dukker op her om ca. 10 minutter.' };
  } catch (e) {
    return fail(e);
  }
}
