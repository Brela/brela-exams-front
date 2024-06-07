import React, { useState } from 'react';
import { ActionIcon, Tooltip, UnstyledButton } from '@mantine/core';
import { twMerge } from 'tailwind-merge';
import { IconRefresh, IconCheck } from '@tabler/icons-react';
import ToolBar from './ToolBar';
import { Question } from '@/types';
import CardSectionGrid from './CardSectionGrid';
import CardWrapper from './CardWrapper';

const Exam = ({
  exam,
  isLoading,
  revealSolutions,
  setRevealSolutions,
  selectedAnswers,
  setSelectedAnswers,
  isCompleted,
  setIsCompleted,
}: {
  exam: Question[];
  isLoading: boolean;
  revealSolutions: boolean;
  setRevealSolutions: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAnswers: (number | null)[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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

  const questionAnswered = (index: number) => selectedAnswers[index] !== null;
  const questionIsCorrect = (index: number) =>
    selectedAnswers[index] === exam[index].answerArrPosition;

  const getOptionClassName = (index: number, i: number, correctIndex: number) => {
    if (!questionAnswered(index)) return 'cursor-pointer';
    if (selectedAnswers[index] === i) {
      return questionIsCorrect(index) ? 'text-green-600' : 'text-red-600 dark:text-red-400';
    }
    return 'text-zinc-700 dark:text-zinc-300';
  };

  return (
    <>
      {exam && exam.length > 0 && (
        <ToolBar
          setRevealSolutions={setRevealSolutions}
          responseIsIn={exam.length > 0}
          exam={exam}
          handleReset={handleReset}
          showReset={selectedAnswers.some((answer) => answer !== null)}
        />
      )}
      <CardSectionGrid>
        {exam?.map((q, index) => (
          <CardWrapper key={index} className="relative" isLoading={isLoading}>
            <div className="flex">
              <div className="mr-2">{`${index + 1})`}</div>
              <h3 className="font-bold mb-2">{q.question}</h3>
            </div>

            <ul className="list-none pl-6">
              {q.options.map((option, i) => (
                <li
                  key={i}
                  className={`${getOptionClassName(index, i, q.answerArrPosition)} flex items-center`}
                >
                  <UnstyledButton
                    disabled={questionAnswered(index)}
                    onClick={() => handleAnswerClick(index, i)}
                    className={twMerge(
                      'flex-grow',
                      questionAnswered(index) &&
                        !questionIsCorrect(index) &&
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
            {questionAnswered(index) && (
              <div className="absolute bottom-0 right-0 p-2">
                {questionIsCorrect(index) && <IconCheck color="green" />}
              </div>
            )}
          </CardWrapper>
        ))}
      </CardSectionGrid>
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
