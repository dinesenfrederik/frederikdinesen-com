import type { Metadata } from 'next';
import '../../src/input.css';
import { FAVICON, RootShell } from '@/lib/rootLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://frederikdinesen.com'),
  title: {
    template: '%s | FD Sound Labs',
    default: 'FD Sound Labs | Rock & Metal Mixing & Audio Blog',
  },
  description:
    'Professional remote mixing and tracking for rock and metal. Read guides, recording tips and mixing techniques.',
  icons: { icon: FAVICON },
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
