import { Button } from '@mantine/core';
import React from 'react';

const RecommendedPrompts = ({
  setValue,
  handlePrompt,
}: {
  setValue: (value: string) => void;
  handlePrompt: (currValue: string, e?: React.FormEvent) => void;
}) => {
  const examPrompts = [
    'Beginner Spanish Vocabulary Quiz',
    'Preschool Math Test',
    'Intermediate Python Programming Challenge',
    'High School Biology Exam',
    'Basic Geography Quiz for Kids',
    'Advanced Calculus Test',
    'Elementary School Science Quiz',
    'English Grammar Test for ESL Learners',
    'World History Quiz for Middle School',
    'Introductory French Language Test',
  ];

  return (
    <section className="flex flex-col">
      <div>Recommended Prompts</div>
      <div className="flex flex-col gap-3">
        {examPrompts.map((prompt, index) => (
          <Button
            key={index}
            onClick={() => {
              setValue(prompt);
              handlePrompt(prompt);
            }}
            variant="light"
            c="pink"
            radius={20}
            className="rounded-lg"
          >
            <div className="text-start w-full">{prompt}</div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default RecommendedPrompts;
