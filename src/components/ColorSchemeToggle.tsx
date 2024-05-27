'use client';

import { Button, useMantineColorScheme } from '@mantine/core';
import { IconBrightnessHalf } from '@tabler/icons-react';
import getColorMode from '../utils/getColorMode';

export function ColorSchemeToggle() {
  const { toggleColorScheme } = useMantineColorScheme();
  const { lightMode } = getColorMode();

  return (
    <div>
      <Button
        variant="subtle"
        onClick={toggleColorScheme}
        className={lightMode ? 'text-zinc-600' : 'text-zinc-300'}
      >
        <IconBrightnessHalf size={24} />
      </Button>
    </div>
  );
}
