'use client';

import { ActionIcon, Box, Divider, Group, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { uniqueId } from 'lodash';
import { sendPrompt } from '@/api/openAi';
import ViewExam from './_components/ViewExam';
import { Question } from '@/types';
import RecommendedPromptsMenu from './_components/RecommendedPromptsMenu';
import useWindowSize from '@/hooks/use-window-size';
import Toolbar from './_components/ToolBar';
import './print.css';
import './transitions.css';
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
    setRevealSolutions(false);
    let body = currValue;

    // if the user hasn't sent a prompt yet, add the preset exam with the asjustment request
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
      {/*  whole home page box */}
      <Box className="flex flex-col items-center ">
        {/* ---- prompt section ---- */}
        <div className="flex items-center justify-center  w-full h-[20vh] gutters-lg">
          <form
            onSubmit={(e) => {
              e?.preventDefault();
              handlePrompt(inputValue);
            }}
          >
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
                      bg="white"
                      pl={6}
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
          </form>
        </div>
        {/* ---- end prompt section ---- */}

        <Box className="flex flex-col items-center printable-content">
          {isExamShowing && (
            <>
              <Toolbar
                setRevealSolutions={setRevealSolutions}
                responseIsIn={isExamShowing}
                exam={exam}
              />
            </>
          )}
          <TransitionGroup>
            <CSSTransition
              key={exam ? exam[0].question : 'no-exam'} // Ensure unique key for each exam
              timeout={300} // Duration of the transition in milliseconds
              classNames="fade" // Class prefix for the transition states
            >
              {exam ? (
                <ViewExam exam={exam} isLoading={isLoading} revealSolutions={revealSolutions} />
              ) : (
                <div /> // Render an empty div if no exam to maintain structure
              )}
            </CSSTransition>
          </TransitionGroup>
        </Box>
        <div className={twMerge(' gutters-sm', isExamShowing ? 'mt-[100px] ' : 'mt-[30px] ')}>
          <div className="mb-4 mx-auto font-semibold text-zinc-400 dark:text-zinc-400 w-full flex justify-center text-xl">
            Preset Exams
          </div>
          {/* <Divider className="mb-4" /> */}
          <PresetExams setExam={setExam} />
        </div>
      </Box>
    </>
  );
};

export default Hub;
