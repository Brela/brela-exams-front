import { Box, Loader, MantineStyleProp } from '@mantine/core';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FULL_HEIGHT } from '@/utils/constants';

const PageLoading = ({ className, style }: { className?: string; style?: MantineStyleProp }) => (
  <Box
    style={
      style || {
        height: FULL_HEIGHT,
      }
    }
    className={twMerge('flex items-center justify-center', className)}
  >
    <Loader size={50} />
  </Box>
);

export default PageLoading;
