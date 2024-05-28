'use client';

import { Box, Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { IconPackageExport, IconPlane } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { sendPrompt } from '@/api/openAi';
import OpenAiResSection from './_homeComponents/OpenAiResSection';
import { Question } from '@/types';
import getColorMode from '@/utils/getColorMode';

const Hub = () => {
  const { darkMode, lightMode } = getColorMode();
  // const isMobile = typeof windowSize?.width === 'number' && windowSize?.width < 768;
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<Question[]>();

  async function handleOpenaiPrompt(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await sendPrompt(value);
      console.log('Formatted questions:', res.questions);
      setResponse(res.questions);
    } catch (error: any) {
      console.log('Error in handleOpenaiPrompt:', error);
      toast(error.message);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Box className="flex flex-col justify-center items-center w-[100vw]">
        <div className="flex items-end justify-center pb-10  h-[15vh]">
          <form onSubmit={handleOpenaiPrompt}>
            <div className="flex items-center gap-3 relative">
              <TextInput w={300} value={value} onChange={(e) => setValue(e.target.value)} />
              <Button type="submit" variant="light" className="absolute -right-14 p-1 px-2">
                <IconPackageExport />
              </Button>
            </div>
          </form>
        </div>

        <Box className="flex justify-center">
          {isLoading ? (
            <div>
              <MoonLoader color={lightMode ? '#000' : 'white'} loading={isLoading} size={40} />
            </div>
          ) : (
            <OpenAiResSection questions={response} />
          )}
        </Box>
      </Box>
    </>
  );
};
export default Hub;
