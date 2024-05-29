import { ColorSchemeScript } from '@mantine/core';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import QueryProvider from '@/providers/React-Query';
import '@/styles/globals.css';
import Layout from '@/providers/Layout';
import 'react-toastify/dist/ReactToastify.css';

const MantineProvider = dynamic(() => import('@/providers/Mantine').then((ctx) => ctx.default), {
  ssr: false,
});

export const metadata: { title: string; description: string } = {
  title: 'Brela Exams',
  description: 'AI generated exams instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/src/assets/favicon.ico" />
        <ColorSchemeScript />
      </head>
      <body>
        <QueryProvider>
          <MantineProvider>
            <Layout>{children}</Layout>
          </MantineProvider>
        </QueryProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
