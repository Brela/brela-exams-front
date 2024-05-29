import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { Question } from '@/types';

const RecievedTest = ({ questions }: { questions: Question[] | undefined }) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);

  return (
    <>
      <div className="questions gap-4 grid grid-cols-2 items-stretch">
        {questions?.map((q, index) => (
          <div
            key={index}
            className="question-card p-4 border dark:border-zinc-600 max-w-[400px] rounded shadow"
          >
            <h3 className="font-bold mb-2">{q.question}</h3>
            <ul className="list-none pl-6">
              {q.options.map((option, i) => (
                <li
                  key={i}
                  className={`${q.answerArrPosition === i ? 'font-bold text-green-600' : ''}`}
                >
                  {option}
                </li>
              ))}
            </ul>
            {/* {activeQuestionIndex === index && <div className="pt-4">{q.answer}</div>}
            <Button
              variant="subtle"
              c="gray"
              onClick={() => setActiveQuestionIndex(index)}
              className="mt-4"
            >
              {activeQuestionIndex === index ? 'Hide Answer' : 'Show Answer'}
            </Button> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default RecievedTest;
