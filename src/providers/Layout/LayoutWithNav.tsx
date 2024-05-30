'use client';

import '@mantine/core/styles.css';
import React, { ReactNode, useEffect, useState } from 'react';
import { AppShell, Burger, Group, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';

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
    <div className="text-zinc-500 dark:text-zinc-300 text-xl font-semibold ">Brela Exams</div>
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
        <Group h="100%" p="sm" px="md" justify={isMobile ? 'space-between' : ''}>
          {isDesktop && <Logo />}

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {isMobile && <Logo />}
          {isDesktop && (
            <Group justify="flex-end" style={{ flex: 1 }}>
              <Group ml="xl" gap={0} visibleFrom="sm">
                {/* removing nav for now since only one page */}
                {/*           <DesktopNav
                  navItems={navItems}
                  active={active}
                  setActive={setActive}
                  toggle={toggle}
                /> */}
                <ColorSchemeToggle />
              </Group>
            </Group>
          )}
        </Group>
      </AppShell.Header>

      {/* MOBILE NAV */}
      <AppShell.Navbar py="md" px={4}>
        {/* removing nav for now since only one page */}
        {/* <MobileNav navItems={navItems} active={active} setActive={setActive} toggle={toggle} /> */}
      </AppShell.Navbar>

      {/* // custom scrollbar that starts below header */}
      <div style={{ overflowY: 'auto', height: `calc(100vh - ${headerHeight}px)` }}>
        {/* <div style={{ height: `calc(100vh - ${headerHeight}px)` }}> */}
        <AppShell.Main>{children}</AppShell.Main>
      </div>
    </AppShell>
  );
}

export default Layout;
