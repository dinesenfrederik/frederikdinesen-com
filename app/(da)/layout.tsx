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
    'Professionel remote mixing og tracking til rock og metal. Læs guides, indspilningstips og mixing-hemmeligheder.',
  icons: { icon: FAVICON },
};

export default function DanishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="da">{children}</RootShell>;
}
