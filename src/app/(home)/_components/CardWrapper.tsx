import React from 'react';
import { twMerge } from 'tailwind-merge';

const CardWrapper = ({
  children,
  className,
  isLoading,
}: {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
}) => (
  <div
    className={twMerge(
      'question-card max-w-[95vw] w-[70vw] lg:w-[30vw] rounded shadow',
      className,
      isLoading ? 'p-0' : 'p-4 border dark:border-zinc-600'
    )}
  >
    {children}
  </div>
);
export default CardWrapper;
