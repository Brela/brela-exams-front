import { ActionIcon, Box, Button, Divider, Group, Tooltip } from '@mantine/core';
import { IconDownload, IconEye, IconPrinter } from '@tabler/icons-react';
import React, { useState } from 'react';
import PrintModal from './printModal/PrintModal';
import { Question } from '@/types';
import TabsGroup from './Tabs';

const ToolBar = ({
  setRevealSolutions,
  responseIsIn,
  exam,
}: {
  setRevealSolutions: React.Dispatch<React.SetStateAction<boolean>>;
  responseIsIn: boolean;
  exam: Question[];
}) => {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  return (
    <Group className=" p-1 px-2 rounded-md w-full flex justify-between">
      {/* <TabsGroup /> */}
      {/*       <Button variant="light" className="" size="xs">
        Take Exam
      </Button> */}
      <Group>
        {/* print */}
        <Tooltip label="Print" position="top" c="white" bg="gray">
          <ActionIcon
            onClick={() => setIsPrintModalOpen(true)}
            className="px-2"
            variant="subtle"
            c="gray"
          >
            <IconPrinter size={20} />
          </ActionIcon>
        </Tooltip>
        <Divider orientation="vertical" />

        {/*reveal solutions */}
        <Tooltip label="Reveal Solutions" position="top" c="white" bg="gray">
          <ActionIcon
            className="px-2"
            variant="subtle"
            c="gray"
            onClick={() => setRevealSolutions((prev: boolean) => !prev)}
          >
            <IconEye size={20} />
          </ActionIcon>
        </Tooltip>

        {/* Print Modal */}
        {responseIsIn && (
          <PrintModal
            isOpen={isPrintModalOpen}
            onClose={() => setIsPrintModalOpen(false)}
            questions={exam}
          />
        )}
      </Group>
    </Group>
  );
};

export default ToolBar;
