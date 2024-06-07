import React from 'react';
import { Menu, Button, Text, rem, ActionIcon } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';
import { Question } from '@/types';
import getColorMode from '@/utils/getColorMode';

const RecommendedPrompts = ({
  exam,
  setInputValue,
  handlePrompt,
  hasFetchedExam,
}: {
  exam: Question[] | undefined;
  setInputValue: (value: string) => void;
  handlePrompt: (currValue: string, e?: React.FormEvent) => void;
  hasFetchedExam: boolean;
}) => {
  const { darkMode, lightMode } = getColorMode();

  const examPrompts = [
    'Ocean Trivia',
    'Beginner Spanish',
    'Disney Trivia',
    'Advanced Physics',
    'World History',
    'Freshman Final Exam - Hogwarts',
  ];

  const adjustmentPrompts = [
    'Make easier',
    'Make harder',
    'Use a Middle English tone',
    'Use a Pirate tone',
  ];

  const responseIsIn = exam && exam?.length > 0;

  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon variant="subtle" c={responseIsIn ? 'pink' : ''}>
          <IconSparkles />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className="px-5">
        {responseIsIn && (
          <>
            <Menu.Label>Adjustment Prompts</Menu.Label>
            {adjustmentPrompts.map((prompt, index) => (
              <Menu.Item
                disabled={!responseIsIn}
                key={index}
                onClick={() => {
                  setInputValue(`Adjust the previous question set to: ${prompt}`);
                  handlePrompt(prompt);
                }}
                className="text-pink-500 bg-zinc-100/50 dark:bg-zinc-800 mb-3"
              >
                {prompt}
              </Menu.Item>
            ))}
          </>
        )}
        {/* <Menu.Divider /> */}
        <Menu.Label>Recommended Prompts</Menu.Label>
        {examPrompts.map((prompt, index) => (
          <Menu.Item
            key={index}
            onClick={() => {
              setInputValue(prompt);
              handlePrompt(prompt);
            }}
            className="text-cyan-700 dark:text-cyan-500 bg-zinc-100/50 dark:bg-zinc-800 mb-3"
          >
            {prompt}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default RecommendedPrompts;
