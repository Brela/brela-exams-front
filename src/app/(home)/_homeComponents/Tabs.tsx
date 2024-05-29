import { rem, Tabs } from '@mantine/core';
import React from 'react';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

const TabsGroup = () => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs color="green" variant="outline" radius="md" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="response" leftSection={<IconPhoto style={iconStyle} />}>
          Response
        </Tabs.Tab>
        <Tabs.Tab value="recommended" leftSection={<IconMessageCircle style={iconStyle} />}>
          Recommended
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="response">Gallery tab content</Tabs.Panel>

      <Tabs.Panel value="recommended">Messages tab content</Tabs.Panel>

      <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
    </Tabs>
  );
};

export default TabsGroup;
