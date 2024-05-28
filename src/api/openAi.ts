import { api_url } from './_config';

export async function sendPrompt(userPrompt: string) {
  console.log(api_url);
  const response = await fetch(`${api_url}/openai/prompt/`, {
    method: 'POST',
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userPrompt,
    }),
  });

  console.log(response);
  if (!response.ok) {
    const data = await response.json();
    // console.log(data.error.message);
    throw new Error(data.error.message);
  }

  const responseData = await response.json();
  console.log('done', responseData);
  return responseData;
}
