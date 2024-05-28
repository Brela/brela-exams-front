'use client';

import { Box, Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { IconPackageExport, IconPlane } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { sendPrompt } from '@/api/openAi';

const Hub = () => {
  // const isMobile = typeof windowSize?.width === 'number' && windowSize?.width < 768;
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  async function handleGptPrompt(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await sendPrompt(value);
      setResponse(res.result);
    } catch (error: any) {
      console.log(error);
      toast(error.message);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Box className="flex flex-col justify-center items-center w-[100vw]">
        <div className="flex items-end justify-center pb-10  h-[30vh]">
          <form onSubmit={handleGptPrompt}>
            <div className="flex items-center gap-3 relative">
              <TextInput w={300} value={value} onChange={(e) => setValue(e.target.value)} />
              <Button type="submit" variant="light" className="absolute -right-14 p-1 px-2">
                <IconPackageExport />
              </Button>
            </div>
          </form>
        </div>

        <Box className="flex justify-center">
          {isLoading ? (
            <div>
              <MoonLoader color="#000" loading={isLoading} size={30} />
            </div>
          ) : (
            <p>response: {response}</p>
          )}
        </Box>
      </Box>
    </>
  );
};
export default Hub;
