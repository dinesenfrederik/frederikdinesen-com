import type { BlogPost } from '@/lib/blog';

const BASE = 'https://frederikdinesen.com';

export function ogImageFor(lang: 'da' | 'en'): string {
  return lang === 'da' ? `${BASE}/assets/og-image.jpg` : `${BASE}/assets/og-image-en.jpg`;
}

export function articleUrl(slug: string, lang: 'da' | 'en'): string {
  return lang === 'da' ? `${BASE}/blog/${slug}` : `${BASE}/en/blog/${slug}`;
}

/**
 * One JSON-LD @graph per article: the article, its FAQ and its breadcrumb trail.
 * Author and publisher point to the same entities (#frederik, #studio) that the
 * homepages define, so search engines and AI answer engines connect the content
 * to FD Sound Labs and Frederik Dinesen.
 */
export function buildArticleGraph(post: BlogPost, lang: 'da' | 'en') {
  const url = articleUrl(post.slug, lang);
  const homeUrl = lang === 'da' ? `${BASE}/` : `${BASE}/en`;
  const blogUrl = lang === 'da' ? `${BASE}/blog` : `${BASE}/en/blog`;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'TechArticle',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.description,
      image: { '@type': 'ImageObject', url: post.coverImage || ogImageFor(lang), width: 1200, height: 630 },
      datePublished: post.date,
      dateModified: post.updated || post.date,
      inLanguage: lang === 'da' ? 'da-DK' : 'en',
      wordCount: post.rawContent.trim().split(/\s+/).length,
      articleSection: post.pillar,
      author: {
        '@type': 'Person',
        '@id': `${BASE}/#frederik`,
        name: post.author,
        url: `${BASE}/`,
        jobTitle: 'Mix Engineer & Producer',
      },
      publisher: {
        '@type': 'LocalBusiness',
        '@id': `${BASE}/#studio`,
        name: 'FD Sound Labs',
        url: `${BASE}/`,
        logo: { '@type': 'ImageObject', url: `${BASE}/assets/logo.png`, width: 512, height: 512 },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isPartOf: { '@id': `${BASE}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'da' ? 'Forside' : 'Home', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: blogUrl },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
