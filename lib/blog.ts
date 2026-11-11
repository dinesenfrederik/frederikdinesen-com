import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TOCItem {
  id: string;
  text: string;
}

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  /** Optional last-updated date (frontmatter `updated`), used for dateModified. */
  updated?: string;
  author: string;
  pillar: string;
  faq: FAQItem[];
  slug: string;
  lang: 'da' | 'en';
  readingTime: string;
  alternateSlug?: string;
  coverImage?: string;
  /** Optional before/after audio player shown above the article body. */
  audioCompare?: { title: string; before: string; after: string; caption?: string };
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
  rawContent: string;
  toc: TOCItem[];
}

const contentRoot = path.join(process.cwd(), 'content/blog');

function calculateReadingTime(text: string, lang: 'da' | 'en'): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return lang === 'da' ? `${minutes} min læsetid` : `${minutes} min read`;
}

function formatDateString(dateVal: unknown): string {
  if (dateVal instanceof Date) {
    return dateVal.toISOString().split('T')[0];
  }
  if (typeof dateVal === 'string') {
    return dateVal;
  }
  return '';
}

function addHeadingIds(htmlContent: string): { html: string; toc: TOCItem[] } {
  const toc: TOCItem[] = [];
  let index = 1;

  const updatedHtml = htmlContent.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, content) => {
    const cleanText = content.replace(/<[^>]+>/g, '').trim();
    const slugId = `trin-${index++}`;
    toc.push({ id: slugId, text: cleanText });
    return `<h2 id="${slugId}"${attrs}>${content}</h2>`;
  });

  return { html: updatedHtml, toc };
}

export function getAllBlogSlugs(lang: 'da' | 'en'): string[] {
  const langDir = path.join(contentRoot, lang);
  if (!fs.existsSync(langDir)) {
    return [];
  }

  const files = fs.readdirSync(langDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getBlogPosts(lang: 'da' | 'en'): BlogPostMeta[] {
  const langDir = path.join(contentRoot, lang);
  if (!fs.existsSync(langDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(langDir).filter((file) => file.endsWith('.md'));

  const posts: BlogPostMeta[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(langDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const readingTime = calculateReadingTime(content, lang);
    const formattedDate = formatDateString(data.date);

    return {
      slug,
      lang,
      title: data.title || slug,
      description: data.description || '',
      date: formattedDate,
      updated: data.updated ? formatDateString(data.updated) : undefined,
      author: data.author || 'Frederik Dinesen',
      pillar: data.pillar || (lang === 'da' ? 'Mixing & Audio-tips' : 'Mixing & Audio Tips'),
      faq: Array.isArray(data.faq) ? data.faq : [],
      readingTime,
      alternateSlug: data.alternateSlug,
      coverImage: data.coverImage,
      audioCompare: data.audioCompare,
    };
  });

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getBlogPostBySlug(slug: string, lang: 'da' | 'en'): Promise<BlogPost | null> {
  const fullPath = path.join(contentRoot, lang, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

  const rawHtml = processedContent.toString();
  const { html: contentHtml, toc } = addHeadingIds(rawHtml);
  const readingTime = calculateReadingTime(content, lang);
  const formattedDate = formatDateString(data.date);

  return {
    slug,
    lang,
    title: data.title || slug,
    description: data.description || '',
    date: formattedDate,
    updated: data.updated ? formatDateString(data.updated) : undefined,
    author: data.author || 'Frederik Dinesen',
    pillar: data.pillar || (lang === 'da' ? 'Mixing & Audio-tips' : 'Mixing & Audio Tips'),
    faq: Array.isArray(data.faq) ? data.faq : [],
    readingTime,
    alternateSlug: data.alternateSlug,
    coverImage: data.coverImage,
    audioCompare: data.audioCompare,
    contentHtml,
    rawContent: content,
    toc,
  };
}
