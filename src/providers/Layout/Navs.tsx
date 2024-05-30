import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import classes from '@/styles/nav.module.css';
import getColorMode from '@/utils/getColorMode';

const DesktopNav = ({
  navItems,
  active,
  setActive,
  toggle,
}: {
  navItems: any;
  active: any;
  setActive: any;
  toggle: any;
}) => (
  <>
    {navItems.map((item: any, index: any) => (
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
  </>
);

const MobileNav = ({
  navItems,
  active,
  setActive,
  toggle,
}: {
  navItems: any;
  active: any;
  setActive: any;
  toggle: any;
}) => {
  const { lightMode, darkMode } = getColorMode();

  return (
    <>
      {/* Use Next.js Link components */}
      {navItems.map((item: any, index: any) => (
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
    </>
  );
};

export { DesktopNav, MobileNav };
