'use client';

import { Box, TextInput } from '@mantine/core';
import { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { sendPrompt } from '@/api/openAi';
import RecievedTest from './_homeComponents/RecievedTest';
import { Question } from '@/types';
import RecommendedPromptsMenu from './_homeComponents/RecommendedPrompts';
import useWindowSize from '@/hooks/use-window-size';
import Toolbar from './_homeComponents/ToolBar';
import './print.css';

const Hub = () => {
  const { isMobile } = useWindowSize();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Question[]>();
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

  const responseIsIn = response && response?.length > 0;

  return (
    <>
      <Box className="flex flex-col items-center w-[100vw] px-[15vw] sm:px-[10vw] lg:px-[15vw]">
        {/* ---- prompt section ---- */}
        <div className="pb-10 w-full h-[10vh] no-print">
          <form onSubmit={(e) => handlePrompt(value, e)}>
            <div className="flex justify-center items-center w-full gap-3">
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

        <Box className="flex flex-col items-end printable-content">
          {responseIsIn && (
            <>
              <Toolbar
                setRevealSolutions={setRevealSolutions}
                responseIsIn={responseIsIn}
                response={response}
              />
            </>
          )}
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
