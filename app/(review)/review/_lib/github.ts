/**
 * Thin GitHub REST client for the review dashboard. Server-only: it reads GITHUB_TOKEN.
 * The token needs (fine-grained, this repo only): Contents RW, Pull requests RW, Actions RW.
 */
const API = process.env.GITHUB_API_URL || 'https://api.github.com'; // override only for local testing
export const REPO = process.env.GITHUB_REPO || 'dinesenfrederik/frederikdinesen-com';
export const ENGINE_WORKFLOW = 'content-engine.yml';

export class GitHubError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function gh<T = unknown>(path: string, init: { method?: string; json?: unknown } = {}): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new GitHubError(500, 'GITHUB_TOKEN er ikke sat i Vercel.');
  const res = await fetch(`${API}/repos/${REPO}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.json !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init.json !== undefined ? JSON.stringify(init.json) : undefined,
    cache: 'no-store',
  });
  if (!res.ok) {
    let message = `GitHub svarede ${res.status}`;
    try {
      const body = (await res.json()) as { message?: string };
      if (body.message) message += `: ${body.message}`;
    } catch {
      // ignore
    }
    throw new GitHubError(res.status, message);
  }
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export interface PullRequest {
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  merged_at: string | null;
  created_at: string;
  closed_at: string | null;
  html_url: string;
  head: { ref: string; sha: string };
  base: { ref: string };
  labels: { name: string }[];
}

export interface PullFile {
  filename: string;
  status: 'added' | 'modified' | 'removed' | 'renamed' | string;
  patch?: string;
}

export interface FileContent {
  text: string;
  sha: string;
}

export async function getFile(path: string, ref: string): Promise<FileContent> {
  const res = await gh<{ content: string; sha: string; encoding: string }>(
    `/contents/${path.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(ref)}`,
  );
  return { text: Buffer.from(res.content, 'base64').toString('utf8'), sha: res.sha };
}

export async function putFile(path: string, branch: string, text: string, sha: string, message: string): Promise<string> {
  const res = await gh<{ content: { sha: string } }>(`/contents/${path.split('/').map(encodeURIComponent).join('/')}`, {
    method: 'PUT',
    json: { message, content: Buffer.from(text, 'utf8').toString('base64'), sha, branch },
  });
  return res.content.sha;
}
