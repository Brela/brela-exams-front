'use client';

import { Box, TextInput } from '@mantine/core';
import { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { sendPrompt } from '@/api/openAi';
import RecievedTest from './_homeComponents/RecievedTest';
import { Question } from '@/types';
import getColorMode from '@/utils/getColorMode';
import RecommendedPromptsMenu from './_homeComponents/RecommendedPrompts';
import useWindowSize from '@/hooks/use-window-size';
import Toolbar from './_homeComponents/ToolBar';

const Hub = () => {
  const { isMobile } = useWindowSize();
  // const isMobile = typeof windowSize?.width === 'number' && windowSize?.width < 768;
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Question[]>();
  // toolbar can set this to true to reveal solutions
  const [revealSolutions, setRevealSolutions] = useState(false);

  async function handlePrompt(currValue: string, e?: React.FormEvent) {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const res = await sendPrompt(currValue);
      console.log('Formatted questions:', res.questions);
      setResponse(res.questions);
    } catch (error: any) {
      console.log('Error in handlePrompt:', error);
      toast(error.message);
    }

    setIsLoading(false);
  }
  console.log(response);

  const responseIsIn = response && response?.length > 0;

  return (
    <>
      <Box className="flex flex-col items-center w-[100vw]  px-[15vw] sm:px-[10vw] lg:px-[15vw]">
        {/* ---- prompt section ---- */}
        <div className=" pb-10 w-full h-[10vh]">
          <form onSubmit={(e) => handlePrompt(value, e)}>
            <div className="flex justify-center items-center w-full gap-3 ">
              <TextInput
                w={isMobile ? 350 : 500}
                leftSection={<IconSearch size={18} />}
                placeholder='Enter desired exam ( e.g. "Beginner Spanish" )'
                size="md"
                radius="lg"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isLoading}
                rightSection={
                  <RecommendedPromptsMenu
                    response={response}
                    setValue={setValue}
                    handlePrompt={handlePrompt}
                  />
                }
              />
            </div>
          </form>
        </div>
        {/* ---- end prompt section ---- */}

        <Box className="flex flex-col items-end">
          {responseIsIn && <Toolbar setRevealSolutions={setRevealSolutions} />}
          <RecievedTest
            questions={response}
            isLoading={isLoading}
            revealSolutions={revealSolutions}
          />
        </Box>
      </Box>
    </>
  );
};
export default Hub;
