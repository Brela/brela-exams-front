'use client';

import { ActionIcon, Box, Button, Divider, Group, TextInput, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import {
  IconDownload,
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
import RecommendedPrompts from './_homeComponents/RecommendedPrompts';
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

  return (
    <>
      <section className=" flex flex-col-reverse lg:flex-row ">
        <Box className="flex flex-col justify-center items-center w-[100vw]">
          <div className="flex items-end justify-center pb-10 w-full h-[15vh]">
            <form onSubmit={(e) => handlePrompt(value, e)}>
              <div className="flex items-center w-full gap-3 ">
                <RecommendedPrompts
                  response={response}
                  setValue={setValue}
                  handlePrompt={handlePrompt}
                />
                <TextInput
                  w={400}
                  leftSection={<IconSearch size={18} />}
                  placeholder='Enter desired exam ( e.g. "Beginner Spanish" )'
                  size="md"
                  radius="lg"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                {responseIsIn && (
                  <Group className=" p-1 px-2 min-w-[200px] rounded-md">
                    <Tooltip label="Download PDF" position="top" c="white" bg="gray">
                      <ActionIcon variant="light" className="border-zinc-200">
                        <IconDownload size={20} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                )}
                {/*  <Button type="submit" variant="light" className="absolute -right-14 p-1 px-2">
                <IconSend2 />
              </Button> */}
              </div>
            </form>
          </div>
          {/* <TabsGroup /> */}
          {/* <Divider className="w-full" /> */}
          <Box className="flex justify-center">
            {isLoading ? (
              <div>
                {/* <div>Fetching Api...</div> */}
                <MoonLoader color={lightMode ? '#000' : 'white'} loading={isLoading} size={40} />
              </div>
            ) : (
              <RecievedTest questions={response} />
            )}
          </Box>
        </Box>
      </section>
    </>
  );
};
export default Hub;
