import React from 'react';
import { Badge, Box, Text, Tooltip } from '@mantine/core';
import { startCase } from 'lodash';
import { Question } from '@/types';
import {
  SetDisney,
  SetGeography,
  SetPirate,
  SetSpace,
  SetSpanish,
  SetStoicism,
} from './QuestionSets';

export enum Tag {
  History = 'history',
  Science = 'science',
  Movies = 'movies',
  Geography = 'geography',
  Wildlife = 'wildlife',
  Space = 'space',
  Education = 'education',
}

export const tagColors: { [key in Tag]: string } = {
  [Tag.History]: 'orange',
  [Tag.Science]: '#90be6d', // green
  [Tag.Movies]: 'blue',
  [Tag.Geography]: 'rgba(180, 189, 155, 1)', // beige
  [Tag.Wildlife]: 'teal',
  [Tag.Space]: 'black',
  [Tag.Education]: '#6A5ACD', // light blue or purple
};

export type PresetExam = {
  img: string;
  imgAlt?: string;
  title: string;
  prompt: string;
  tag: Tag;
  questions: Question[];
};

const presetExams: PresetExam[] = [
  {
    img: '/cards/disneyCastle.webp',
    imgAlt: 'shakespearean Disney Castle',
    title: 'Old Disney Trivia',
    prompt: 'Disney Trivia with a Shakespearean Tone',
    tag: Tag.Movies,
    questions: SetDisney,
  },
  {
    img: '/cards/pirateShip.webp',
    imgAlt: 'pirate ship w/ dolphin jumping out of water',
    title: 'Pirate Trivia',
    prompt: 'Pirate Trivia with a pirate tone.',
    tag: Tag.History,
    questions: SetPirate,
  },
  {
    img: '/cards/space.webp',
    imgAlt: 'outer space',
    title: 'Space Trivia',
    prompt: 'Intermediate level outer space trivia',
    tag: Tag.Space,
    questions: SetSpace,
  },
  {
    img: '/cards/stoicism.webp',
    imgAlt: 'roman architecture',
    title: 'Stoicism',
    prompt: 'A test on Stoicism, in the tone of Marcus Aurelius',
    tag: Tag.History,
    questions: SetStoicism,
  },
  {
    img: '/cards/spanish.webp',
    imgAlt: 'spanish words',
    title: 'Beginner Spanish',
    prompt: 'A beginner level Spanish exam',
    tag: Tag.Education,
    questions: SetSpanish,
  },
  {
    img: '/cards/world.jpg',
    imgAlt: 'world map',
    title: 'Geography',
    prompt: 'Epic World geography',
    tag: Tag.Geography,
    questions: SetGeography,
  },
];

const PresetExams = ({
  setExam,
  setInputValue,
}: {
  setExam: (exam: Question[]) => void;
  setInputValue: (value: string) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-4 p-4">
    {presetExams.map((pExam, index) => (
      <PresetCard key={index} pExam={pExam} setExam={setExam} setInputValue={setInputValue} />
    ))}
  </div>
);

export default PresetExams;

const PresetCard = ({
  pExam,
  setExam,
  setInputValue,
}: {
  pExam: PresetExam;
  setExam: (exam: Question[]) => void;
  setInputValue: (value: string) => void;
}) => (
  <div
    className="flex flex-col items-center p-4 rounded-lg text-center cursor-pointer transition-transform duration-200 hover:scale-105 w-[120px]"
    onClick={() => {
      setExam(pExam.questions);
      setInputValue(pExam.prompt);
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setExam(pExam.questions);
        setInputValue(pExam.prompt);
      }
    }}
    role="button"
    tabIndex={0}
  >
    <img
      src={pExam.img}
      alt={pExam.imgAlt || pExam.title}
      className="w-12 h-12 object-cover rounded-full mb-2"
    />
    <Box className="flex flex-col items-center">
      <Text size="sm" c="dimmed" mt={8}>
        <Tooltip
          color="gray"
          label={<span className="font-semibold">Prompt: {pExam.prompt} </span>}
          position="bottom"
        >
          <Text>{startCase(pExam.title)}</Text>
        </Tooltip>
      </Text>
      {/* <Badge color={tagColors[pExam.tag]}>{startCase(pExam.tag)}</Badge> */}
    </Box>
  </div>
);
