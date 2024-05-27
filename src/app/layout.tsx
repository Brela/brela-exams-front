import { ColorSchemeScript } from '@mantine/core';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import QueryProvider from './Providers/React-Query';
// import '../styles/globals.css';
import MainShell from './AppShell';

const MantineProvider = dynamic(() => import('./Providers/Mantine').then((ctx) => ctx.default), {
  ssr: false,
});

export const metadata: { title: string; description: string } = {
  title: 'Brela Exams',
  description: 'AI generated exams instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <ColorSchemeScript />
      </Head>
      <body>
        <QueryProvider>
          <MantineProvider>
            <MainShell>{children}</MainShell>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
