'use client';

import { Button, useMantineColorScheme } from '@mantine/core';
import { IconBrightnessHalf } from '@tabler/icons-react';
import getColorMode from '../utils/getColorMode';

export function ColorSchemeToggle() {
  const { toggleColorScheme } = useMantineColorScheme();
  const { lightMode } = getColorMode();

  return (
    <div>
      <Button onClick={toggleColorScheme} className={lightMode ? 'text-gray-700' : 'text-white'}>
        <IconBrightnessHalf size={24} />
      </Button>
    </div>
  );
}
