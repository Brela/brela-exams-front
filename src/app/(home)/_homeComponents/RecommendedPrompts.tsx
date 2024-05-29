import React from 'react';
import { Menu, Button, Text, rem, ActionIcon } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';
import { Question } from '@/types';
import getColorMode from '@/utils/getColorMode';

const RecommendedPrompts = ({
  response,
  setValue,
  handlePrompt,
}: {
  response: Question[] | undefined;
  setValue: (value: string) => void;
  handlePrompt: (currValue: string, e?: React.FormEvent) => void;
}) => {
  const { darkMode, lightMode } = getColorMode();

  const examPrompts = [
    'Simple Ocean Trivia',
    'Beginner Spanish',
    'Disney Trivia',
    'Preschool Math',
    'Advanced Physics',
    'World History',
  ];

  const adjustmentPrompts = [
    'Make easier',
    'Make harder',
    'Use a Middle English tone',
    'Use a Pirate tone',
    'Phrase in a superhero style',
  ];

  const responseIsIn = response && response?.length > 0;

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
                  setValue(`Adjust the previous question set to: ${prompt}`);
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
              setValue(prompt);
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
