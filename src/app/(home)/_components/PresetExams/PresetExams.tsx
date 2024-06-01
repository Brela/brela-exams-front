import React from 'react';
import { Badge, Box, Button, Card, Flex, Group, Image, Text, Tooltip } from '@mantine/core';
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
    imgAlt: 'pirate ship w/ doplhin jumping out of water',
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
    title: 'stoicism',
    prompt: 'A test on Stoicism, in the tone of Marcus Aurelius',
    tag: Tag.History,
    questions: SetStoicism,
  },
  {
    img: '/cards/spanish.webp',
    imgAlt: 'spanish words',
    title: 'Beginner Spanish',
    prompt: 'A beginner level spanish exam',
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

console.log(presetExams[0]);
const PresetExams = ({ setExam }: { setExam: (exam: Question[]) => void }) => (
  <>
    <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {presetExams.map((pExam, index) => (
        <PresetCard key={index} pExam={pExam} setExam={setExam} className="col-span-1" />
      ))}
    </div>
  </>
);

export default PresetExams;

const PresetCard = ({
  pExam,
  setExam,
  className,
}: {
  pExam: PresetExam;
  setExam: (exam: Question[]) => void;
  className: string;
}) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder className={className}>
    <Card.Section>
      <div style={{ width: '100%', height: '150px', objectFit: 'cover' }}>
        <Image src={pExam.img} alt={pExam.imgAlt} style={{ width: '100%', height: '100%' }} />
      </div>
    </Card.Section>

    <section className="flex flex-col justify-between h-full">
      <Box>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}> {startCase(pExam.title)}</Text>
          {/*          <Badge size="xs" color={tagColors[pExam.tag]}>
            {pExam.tag}
          </Badge> */}
          {/* <Badge color={tagColors[pExam.tag]}>{pExam.tag}</Badge> */}
        </Group>

        <Text size="sm" c="dimmed" mt={8}>
          <Tooltip
            color="gray"
            label="The prompt given to openAi api to recieve this test"
            position="bottom"
          >
            <span className="font-semibold">Prompt: </span>
          </Tooltip>
          {pExam.prompt}
        </Text>
      </Box>
      <Button
        onClick={() => setExam(pExam.questions)}
        color="blue"
        // w="50%"
        fullWidth
        mx="auto"
        mt="md"
        variant="light"
        radius="md"
      >
        Take Exam
      </Button>
    </section>
  </Card>
);
