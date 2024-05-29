import React, { useState } from 'react';
import { Button, Skeleton } from '@mantine/core';
import { twMerge } from 'tailwind-merge';
import { Question } from '@/types';

const RecievedTest = ({
  questions,
  isLoading,
  revealSolutions,
}: {
  questions: Question[] | undefined;
  isLoading: boolean;
  revealSolutions: boolean;
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);

  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <div
      className={twMerge(
        'question-card max-w-[95vw] w-[70vw] lg:w-[30vw] rounded shadow',
        isLoading ? '' : 'p-4 border dark:border-zinc-600'
      )}
    >
      {children}
    </div>
  );

  const numOfRows = 10; // Define the number of rows
  // const isLoading = true;

  console.log(questions);
  return (
    <>
      <div className="questions gap-4 grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {isLoading
          ? Array.from({ length: numOfRows }).map((_, index) => (
              <CardWrapper key={index}>
                <Skeleton height={100} />
              </CardWrapper>
            ))
          : questions?.map((q, index) => (
              <CardWrapper key={index}>
                <h3 className="font-bold mb-2">{q.question}</h3>
                <ul className="list-none pl-4">
                  {q.options.map((option, i) => (
                    <li
                      key={i}
                      className={`${revealSolutions && q.answerArrPosition === i ? 'font-bold text-green-600' : ''}`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
                {/*     <Button
                variant="subtle"
                key={index}
                className={`answer-option ${
                  selectedAnswer === option ? (isCorrect ? 'correct' : 'wrong') : ''
                }`}
                onClick={() => {
                  // if its correct already, don't allow a select
                  if (!isCorrect) {
                    handleOptionClick(option);
                  }
                }}
              >
                <div>{`${getLetterOption(index)})`}</div>
                <div>{option}</div>
              </Button> */}
              </CardWrapper>
            ))}
      </div>
    </>
  );
};

export default RecievedTest;
