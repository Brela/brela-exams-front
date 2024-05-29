import { ActionIcon, Divider, Group, Tooltip } from '@mantine/core';
import { IconDownload, IconEye } from '@tabler/icons-react';
import React from 'react';

const ToolBar = ({
  setRevealSolutions,
}: {
  setRevealSolutions: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Group className=" p-1 px-2 rounded-md">
    {/* download pdf */}
    <Tooltip label="Download PDF" position="top" c="white" bg="gray">
      <ActionIcon className="px-2" variant="subtle" c="gray">
        <IconDownload size={20} />
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
  </Group>
);

export default ToolBar;
