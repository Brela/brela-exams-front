'use client';

import '@mantine/core/styles.css';
import React, { ReactNode, useEffect, useState } from 'react';
import { AppShell, Burger, Group, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import useWindowSize from '../../hooks/use-window-size';
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle';

function Layout({ children }: { children: ReactNode }) {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(pathname);

  const { isMobile, isDesktop } = useWindowSize();

  const navItems = [
    { href: '/', label: 'Hub' },
    { href: '/testing', label: 'Testing' },
  ];

  // this useEffect allows us to use "dark:" tailwind prefix and is based on app colorScheme
  useEffect(() => {
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorScheme]);

  const Logo = () => (
    <a href="/" className="text-zinc-500 dark:text-zinc-300 text-xl font-semibold cursor-pointer">
      Brela Exams
    </a>
  );

  const headerHeight = 60;

  return (
    <AppShell
      header={{ height: headerHeight }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      mb={100}
      mt={60}
    >
      <AppShell.Header>
        <Group h="100%" p="sm" px="md" justify="space-between">
          <Logo />
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>

      {/* // custom scrollbar that starts below header */}
      <div style={{ overflowY: 'auto', height: `calc(100vh - ${headerHeight}px)` }}>
        {/* <div style={{ height: `calc(100vh - ${headerHeight}px)` }}> */}
        <AppShell.Main className="mb-[200px]">{children}</AppShell.Main>
      </div>
    </AppShell>
  );
}

export default Layout;
