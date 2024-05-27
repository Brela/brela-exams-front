'use client';

import { TextInput } from '@mantine/core';
import getColorMode from '../../utils/getColorMode';

const Hub = () => {
  const { lightMode, darkMode } = getColorMode();
  // const isMobile = typeof windowSize?.width === 'number' && windowSize?.width < 768;

  return (
    <>
      <div className="flex justify-center items-center w-[100vw] h-[70vh]">
        <TextInput />
      </div>
    </>
  );
};
export default Hub;
