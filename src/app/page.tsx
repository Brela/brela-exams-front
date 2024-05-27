'use client';

import { twMerge } from 'tailwind-merge';
import SectionMain from './_homeComponents/wrappers/SectionMain';
import getColorMode from '../utils/getColorMode';

const Hub = () => {
  const { lightMode, darkMode } = getColorMode();
  // const isMobile = typeof windowSize?.width === 'number' && windowSize?.width < 768;

  return (
    <>
      <SectionMain>
        <div>heloo</div>
      </SectionMain>
    </>
  );
};
export default Hub;
