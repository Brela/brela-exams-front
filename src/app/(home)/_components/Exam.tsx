import React, { useEffect } from 'react';
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
  handleReset,
}: {
  exam: Question[];
  isLoading: boolean;
  revealSolutions: boolean;
  setRevealSolutions: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAnswers: (number | null)[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  handleReset: () => void;
}) => {
  const handleAnswerClick = (questionIndex: number, answerIndex: number) => {
    console.log(`Question: ${questionIndex}, Answer: ${answerIndex}`);
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    const allAnswered = newSelectedAnswers.every((answer) => answer !== null);
    const allCorrect = newSelectedAnswers.every(
      (answer, index) => answer === exam[index].answerArrPosition
    );
    setIsCompleted(allAnswered && allCorrect);
  };

  const calculateGrade = () => {
    if (!exam) return 0;
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === exam[index].answerArrPosition
    );
    return ((correctAnswers.length / exam.length) * 100).toFixed(2);
  };

  const questionAnswered = (index: number) => {
    console.log(`Question ${index} answered:`, selectedAnswers[index] !== null);
    return selectedAnswers[index] !== null;
  };

  const questionIsCorrect = (index: number) =>
    selectedAnswers[index] === exam[index].answerArrPosition;

  const getOptionClassName = (index: number, i: number, correctIndex: number) => {
    if (!questionAnswered(index)) return 'cursor-pointer';
    if (selectedAnswers[index] === i) {
      return questionIsCorrect(index) ? 'text-green-600' : 'text-red-600 dark:text-red-400';
    }
    if (revealSolutions && correctIndex === i) {
      return 'font-bold text-green-600';
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

            <div className="flex flex-col space-y-1 pl-6">
              {q.options.map((option, i) => (
                <UnstyledButton
                  key={i}
                  onClick={() => handleAnswerClick(index, i)}
                  disabled={questionAnswered(index)}
                  className={twMerge(
                    'flex-grow text-left cursor-pointer',
                    getOptionClassName(index, i, q.answerArrPosition)
                  )}
                >
                  {option}
                </UnstyledButton>
              ))}
            </div>
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
          <Tooltip label="Reset" position="top" color="white" bg="gray">
            <ActionIcon onClick={handleReset} variant="light" color="gray">
              <IconRefresh />
            </ActionIcon>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default Exam;
