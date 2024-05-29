'use client';

import '@mantine/core/styles.css';
import React, { ReactNode, useEffect, useState } from 'react';
import { AppShell, Burger, Group, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link'; // Import Link from Next.js
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import getColorMode from '@/utils/getColorMode';
import classes from '../styles/nav.module.css';
import useWindowSize from '../hooks/use-window-size';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle';

function Layout({ children }: { children: ReactNode }) {
  const { lightMode, darkMode } = getColorMode();
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(pathname);

  const { isMobile, isDesktop } = useWindowSize();

  const navItems = [
    { href: '/', label: 'Hub' },
    { href: '/testing', label: 'Testing' },
    // { href: '/pastEvents', label: 'Past Events' },
    // { href: '/blog', label: 'Blog' },
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
    <div className="text-zinc-500 dark:text-green-500/70 text-xl font-semibold ">Brela Exams</div>
  );

  const headerHeight = 60;

  return (
    <AppShell
      header={{ height: headerHeight }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      mb={100}
      mt={60}
    >
      <AppShell.Header>
        <Group h="100%" p="sm" px="md" justify={isMobile ? 'space-between' : ''}>
          {isDesktop && (
            <Logo />
            /*          <Image
              src={lightMode ? '/ldd-logo-black.png' : '/ldd-logo-white.png'}
              priority
              width={133}
              height={60}
              alt="Picture of the author"
            /> */
          )}
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {isMobile && (
            <Logo />
            /*      <Group>
              <Image
                src={darkMode ? '/ldd-logo-white.png' : '/ldd-logo-black.png'}
                priority
                width={128}
                height={50}
                alt="Picture of the author"
              />
            </Group> */
          )}
          {isDesktop && (
            // Other elements for desktop or additional conditional content
            <Group justify="flex-end" style={{ flex: 1 }}>
              <Group ml="xl" gap={0} visibleFrom="sm">
                {navItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <div
                      key={item.href}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setActive(item.href);
                        toggle();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault(); // Prevent scrolling on space press
                          setActive(item.href);
                          toggle();
                        }
                      }}
                      // className={`${classes.control} ${item.href === active ? `${darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f] '} font-bold` : ''}`}
                      className={twMerge(
                        classes.control,
                        item.href === active ? 'text-green-500 font-bold' : ''
                      )}
                    >
                      {item.label}
                    </div>
                  </Link>
                ))}
                <ColorSchemeToggle />
              </Group>
            </Group>
          )}
        </Group>
      </AppShell.Header>

      {/* MOBILE NAV */}
      <AppShell.Navbar py="md" px={4}>
        {/* Use Next.js Link components */}
        {navItems.map((item, index) => (
          <div
            key={item.href}
            role="button"
            tabIndex={0}
            onClick={() => {
              setActive(item.href);
              toggle();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent scrolling on space press
                setActive(item.href);
                toggle();
              }
            }}
            className={`${classes.control} ${item.href === active ? `${darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f] '} font-bold` : ''}`}
          >
            <Link href={item.href}>{item.label}</Link>
          </div>
        ))}
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
