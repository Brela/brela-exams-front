'use client';

import { ActionIcon, Box, Divider, Group, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { sendPrompt } from '@/api/openAi';
import ViewExam from './_components/ViewExam';
import { Question } from '@/types';
import RecommendedPromptsMenu from './_components/RecommendedPromptsMenu';
import useWindowSize from '@/hooks/use-window-size';
import Toolbar from './_components/ToolBar';
import './print.css';
import PresetExams from './_components/PresetExams/PresetExams';

const Hub = () => {
  const { isMobile } = useWindowSize();
  const [revealSolutions, setRevealSolutions] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [exam, setExam] = useState<Question[]>();
  // if the user uses one of the adjustment prompts "make easier" but hasn't  fetched an exam yet, we need to send the presetSelectedExam with the req for context
  const [hasFetchedExam, setHasFetchedExam] = useState(false);

  async function handlePrompt(currValue: string) {
    setIsLoading(true);
    let body = currValue;

    if (!hasFetchedExam && exam) {
      body += ` Here is the exam that needs adjusted: ${JSON.stringify(exam)}`;
    }
    try {
      console.log(body);
      const res = await sendPrompt(currValue);
      console.log('Formatted exam:', res.questions);
      setExam(res.questions);
    } catch (error: any) {
      console.log('Error in handlePrompt:', error.message);
      toast(error.message);
    }

    setIsLoading(false);
    setHasFetchedExam(true);
  }

  const isExamShowing = exam && exam?.length > 0;

  return (
    <>
      <Box className="flex flex-col items-center w-[100vw] px-[15vw] sm:px-[10vw] lg:px-[15vw]">
        {/* ---- prompt section ---- */}
        <div className="pb-10 w-full h-[10vh] no-print">
          <form
            onSubmit={(e) => {
              e?.preventDefault();
              handlePrompt(inputValue);
            }}
          >
            <div className="flex justify-center items-center w-full gap-3">
              <TextInput
                w={isMobile ? 350 : 600}
                leftSection={<IconSearch size={18} />}
                placeholder='Enter desired exam ( e.g. "Beginner Spanish" )'
                size="md"
                radius="lg"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                rightSection={
                  <div className="flex items-center gap-1 mr-6">
                    {inputValue && (
                      <ActionIcon
                        size="sm"
                        c="dimmed"
                        variant="subtle"
                        onClick={() => setInputValue('')}
                      >
                        <IconX size="sm" />
                      </ActionIcon>
                    )}
                    <RecommendedPromptsMenu
                      exam={exam}
                      setInputValue={setInputValue}
                      handlePrompt={handlePrompt}
                      hasFetchedExam={hasFetchedExam}
                    />
                  </div>
                }
              />
            </div>
          </form>
        </div>
        {/* ---- end prompt section ---- */}

        <Box className="flex flex-col items-end printable-content">
          {isExamShowing && (
            <>
              <Toolbar
                setRevealSolutions={setRevealSolutions}
                responseIsIn={isExamShowing}
                exam={exam}
              />
            </>
          )}
          <ViewExam exam={exam} isLoading={isLoading} revealSolutions={revealSolutions} />
          <div className={twMerge(isExamShowing ? 'mt-[200px] ' : 'mt-[90px] ')}>
            <div className="mb-4 mx-auto font-semibold text-zinc-500 dark:text-zinc-400 w-full flex justify-center text-xl">
              Presets
            </div>
            <Divider className="mb-4" />
            <PresetExams setExam={setExam} />
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Hub;
