import safeStringify from 'json-stringify-safe';
import { api_url } from './_config';

export const maxDuration = 20;
export const dynamic = 'force-dynamic';

// Ensure the function is async and exported properly
export async function sendPrompt(userPrompt: string) {
  const API_URL = api_url || 'https://brela-exams-back-production.up.railway.app';

  console.log('API_URL:  ', API_URL);
  const response = await fetch(`${API_URL}/openai/prompt/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: safeStringify({
      userPrompt,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error.message);
  }

  const responseData = await response.json();

  try {
    let sanitizedResult = responseData.result;
    sanitizedResult = sanitizedResult.replace(/\\n/g, '');
    const parsedResult = JSON.parse(sanitizedResult);
    parsedResult.questions = parsedResult.questions.filter(
      (question: any) => question.question && question.options && question.answer !== undefined
    );

    return parsedResult;
  } catch (error) {
    console.error('Error in parsing or filtering:', error);
    throw new Error('Failed to parse or filter response JSON');
  }
}
