'use client';

import { ActionIcon, Box, Divider, Group, Skeleton, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { uniqueId } from 'lodash';
import { sendPrompt } from '@/api/openAi';
import Exam from './_components/Exam';
import { Question } from '@/types';
import RecommendedPromptsMenu from './_components/RecommendedPromptsMenu';
import useWindowSize from '@/hooks/use-window-size';
import Toolbar from './_components/ToolBar';
import './print.css';
import './transitions.css';
import PresetExams from './_components/PresetExams/PresetExams';
import getColorMode from '@/utils/getColorMode';
import CardSectionGrid from './_components/CardSectionGrid';
import CardWrapper from './_components/CardWrapper';

const Home = () => {
  const desiredExamLength = 10;
  const { darkMode, lightMode } = getColorMode();
  const { isMobile } = useWindowSize();
  const [revealSolutions, setRevealSolutions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [exam, setExam] = useState<Question[]>([]);
  // if the user uses one of the adjustment prompts "make easier" but hasn't  fetched an exam yet, we need to send the presetSelectedExam with the req for context
  const [hasFetchedExam, setHasFetchedExam] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleReset = () => {
    setSelectedAnswers(Array(exam.length).fill(null));
    setIsCompleted(false);
  };

  useEffect(() => {
    if (exam.length > 0) {
      setSelectedAnswers(Array(exam.length).fill(null));
    }
  }, [exam]);

  async function handlePrompt(currValue: string) {
    setIsLoading(true);
    setRevealSolutions(false);
    handleReset();
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
        <div className="flex items-center justify-center  w-full h-[15vh] gutters-lg">
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
                      className="text-zinc-400 dark:text-zinc-400"
                      bg={lightMode ? 'white' : 'gray'}
                      ml={6}
                      variant="subtle"
                      onClick={() => setInputValue('')}
                    >
                      <IconX size="15px" />
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
          {isLoading ? (
            <CardSectionGrid>
              {Array.from({ length: 10 }).map((_, index) => (
                <CardWrapper key={index} isLoading={isLoading}>
                  <Skeleton height={150} />
                </CardWrapper>
              ))}
            </CardSectionGrid>
          ) : (
            <Exam
              exam={exam}
              isLoading={isLoading}
              revealSolutions={revealSolutions}
              setRevealSolutions={setRevealSolutions}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
              handleReset={handleReset}
            />
          )}
        </Box>
        <div className={twMerge(' gutters-sm', isExamShowing ? 'mt-[100px] ' : 'mt-[30px] ')}>
          <div className="mb-4 mx-auto font-semibold text-zinc-400 dark:text-zinc-400 w-full flex justify-center text-xl">
            Preset Exams
          </div>
          {/* <Divider className="mb-4" /> */}
          <PresetExams setExam={setExam} setInputValue={setInputValue} handleReset={handleReset} />
        </div>
      </Box>
    </>
  );
};

export default Home;
