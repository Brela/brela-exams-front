import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const SectionMain = ({ children, className }: { children: ReactNode; className?: string }) => (
  <section className={twMerge('w-full lg:w-[75vw] mx-auto mb-10', className)}>{children}</section>
);

export default SectionMain;
