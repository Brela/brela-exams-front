import dynamic from 'next/dynamic';

const LayoutProvider = dynamic(() => import('@/providers/Layout').then((ctx) => ctx.default), {
  ssr: false,
});

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
