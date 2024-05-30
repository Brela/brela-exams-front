'use client';

import { useMantineColorScheme } from '@mantine/core';

export default function getColorMode() {
  const { colorScheme } = useMantineColorScheme();

  // Define the boolean flags based on the current color scheme
  const lightMode = colorScheme === 'light';
  const darkMode = colorScheme === 'dark';

  return { lightMode, darkMode };
}
