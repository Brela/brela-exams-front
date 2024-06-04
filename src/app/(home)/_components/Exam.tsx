import React, { useState } from 'react';
import { ActionIcon, Button, Skeleton, Tooltip, UnstyledButton } from '@mantine/core';
import { twMerge } from 'tailwind-merge';
import { IconRefresh, IconArrowRight } from '@tabler/icons-react';
import ToolBar from './ToolBar';
import { Question } from '@/types';

const Exam = ({
  exam,
  isLoading,
  revealSolutions,
  setRevealSolutions,
}: {
  exam: Question[];
  isLoading: boolean;
  revealSolutions: boolean;
  setRevealSolutions: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(exam?.length).fill(null)
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerClick = (questionIndex: number, answerIndex: number) => {
    if (selectedAnswers[questionIndex] === null) {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[questionIndex] = answerIndex;
      setSelectedAnswers(newSelectedAnswers);

      if (newSelectedAnswers.every((answer) => answer !== null)) {
        setIsCompleted(true);
      }
    }
  };

  const calculateGrade = () => {
    if (!exam) return 0;
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === exam[index].answerArrPosition
    );
    return ((correctAnswers.length / exam.length) * 100).toFixed(2);
  };

  const handleReset = () => {
    setSelectedAnswers(Array(exam?.length).fill(null));
    setIsCompleted(false);
  };

  const getOptionClassName = (index: number, i: number, correctIndex: number) => {
    if (selectedAnswers[index] === null) return 'cursor-pointer';
    // if (revealSolutions) return 'text-green-600';
    if (selectedAnswers[index] === i) {
      return correctIndex === i ? 'text-green-600' : 'text-red-600 dark:text-red-400';
    }
    return 'text-zinc-700';
  };

  const CardWrapper = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={twMerge(
        'question-card max-w-[95vw] w-[70vw] lg:w-[30vw] rounded shadow',
        className,
        isLoading ? '' : 'p-4 border dark:border-zinc-600'
      )}
    >
      {children}
    </div>
  );

  const numOfRows = 10; // Define the number of rows
  const isExamShowing = (exam && exam?.length > 0) || false;

  return (
    <>
      <>
        <ToolBar
          setRevealSolutions={setRevealSolutions}
          responseIsIn={isExamShowing}
          exam={exam}
          handleReset={handleReset}
          showReset={selectedAnswers.some((answer) => answer !== null)}
        />
      </>
      <div className="exam gap-4 grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {isLoading ? (
          Array.from({ length: numOfRows }).map((_, index) => (
            <CardWrapper key={index}>
              <Skeleton height={150} />
            </CardWrapper>
          ))
        ) : (
          <>
            {exam?.map((q, index) => (
              <CardWrapper key={index} className="">
                <h3 className="font-bold mb-2">{q.question}</h3>
                <ul className="list-none pl-4">
                  {q.options.map((option, i) => (
                    <li
                      key={i}
                      className={`${getOptionClassName(index, i, q.answerArrPosition)} flex items-center`}
                    >
                      <UnstyledButton
                        disabled={selectedAnswers[index] !== null}
                        onClick={() => handleAnswerClick(index, i)}
                        className={twMerge(
                          'flex-grow',
                          selectedAnswers[index] !== null &&
                            selectedAnswers[index] !== q.answerArrPosition &&
                            q.answerArrPosition === i &&
                            'underline',
                          `${revealSolutions && q.answerArrPosition === i ? 'font-bold text-green-600' : ''}`
                        )}
                      >
                        {option}
                      </UnstyledButton>
                    </li>
                  ))}
                </ul>
              </CardWrapper>
            ))}
          </>
        )}
      </div>
      {isCompleted && (
        <div className="mt-4 flex justify-center items-center">
          <h2 className="font-bold mr-4">Your Grade: {calculateGrade()}%</h2>
          <Tooltip label="Reset" position="top" c="white" bg="gray">
            <ActionIcon onClick={handleReset} variant="light" c="gray">
              <IconRefresh />
            </ActionIcon>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default Exam;
