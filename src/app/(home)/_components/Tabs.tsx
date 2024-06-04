import { rem, Tabs } from '@mantine/core';
import React from 'react';
import { IconPhoto, IconMessageCircle } from '@tabler/icons-react';

const TabsGroup = () => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs color="green" variant="outline" radius="md" defaultValue="view" w="100%">
      <Tabs.List>
        <Tabs.Tab value="view" leftSection={<IconPhoto style={iconStyle} />}>
          View Exam
        </Tabs.Tab>
        <Tabs.Tab value="take" leftSection={<IconMessageCircle style={iconStyle} />}>
          Take Exam
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="response">Something here{/* <ViewExam /> */}</Tabs.Panel>

      <Tabs.Panel value="recommended">Messages tab content</Tabs.Panel>
    </Tabs>
  );
};

export default TabsGroup;
