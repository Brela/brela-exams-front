'use client';

import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Skeleton,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import {
  IconDownload,
  IconEye,
  IconPackageExport,
  IconPlane,
  IconSearch,
  IconSend2,
} from '@tabler/icons-react';
import { toast } from 'react-toastify';
import isEmpty from 'lodash';
import { sendPrompt } from '@/api/openAi';
import RecievedTest from './_homeComponents/RecievedTest';
import { Question } from '@/types';
import getColorMode from '@/utils/getColorMode';
import RecommendedPromptsMenu from './_homeComponents/RecommendedPrompts';
import TabsGroup from './_homeComponents/Tabs';

const Hub = () => {
  const { darkMode, lightMode } = getColorMode();
  // const isMobile = typeof windowSize?.width === 'number' && windowSize?.width < 768;
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Question[]>();

  async function handlePrompt(currValue: string, e?: React.FormEvent) {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const res = await sendPrompt(currValue);
      console.log('Formatted questions:', res.questions);
      setResponse(res.questions);
    } catch (error: any) {
      console.log('Error in handlePrompt:', error);
      toast(error.message);
    }

    setIsLoading(false);
  }
  console.log(response);

  const responseIsIn = response && response?.length > 0;

  const PromptSection = () => (
    <div className=" pb-10 w-full h-[10vh]">
      <form onSubmit={(e) => handlePrompt(value, e)}>
        <div className="flex justify-center items-center w-full gap-3 ">
          <TextInput
            w={400}
            leftSection={<IconSearch size={18} />}
            placeholder='Enter desired exam ( e.g. "Beginner Spanish" )'
            size="md"
            radius="lg"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isLoading}
            rightSection={
              <RecommendedPromptsMenu
                response={response}
                setValue={setValue}
                handlePrompt={handlePrompt}
              />
            }
          />
        </div>
      </form>
    </div>
  );

  return (
    <>
      <Box className="flex flex-col items-center w-[100vw]  px-[15vw] sm:px-[10vw] lg:px-[15vw]">
        <PromptSection />
        {/* <TabsGroup /> */}
        {/* <Divider className="w-full" /> */}
        <Box className="flex flex-col items-end">
          {/* // controls */}
          {responseIsIn && (
            <Group className=" p-1 px-2 rounded-md">
              {/* download pdf */}
              <Tooltip label="Download PDF" position="top" c="white" bg="gray">
                <ActionIcon variant="subtle" c="gray">
                  <IconDownload className="p-0" size={20} />
                </ActionIcon>
              </Tooltip>
              <Divider orientation="vertical" />
              {/*reveal solutions */}
              <Tooltip label="Reveal Solutions" position="top" c="white" bg="gray">
                <ActionIcon variant="subtle" c="gray">
                  <IconEye className="p-0" size={20} />
                </ActionIcon>
              </Tooltip>
            </Group>
          )}
          <RecievedTest questions={response} isLoading={isLoading} />
        </Box>
      </Box>
    </>
  );
};
export default Hub;
