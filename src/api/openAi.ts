'use server';

import safeStringify from 'json-stringify-safe';
import { api_url } from './_config';

export async function sendPrompt(userPrompt: string) {
  // env not working with hosted app via - vercel variables - hardcoding for now
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
  console.log('Raw response data:', responseData);

  try {
    // Step-by-step sanitization and logging
    let sanitizedResult = responseData.result;
    console.log('Original result:', sanitizedResult);

    // Remove newline characters
    sanitizedResult = sanitizedResult.replace(/\\n/g, '');
    console.log('After removing newlines:', sanitizedResult);

    // Ensure JSON is properly closed
    const parsedResult = JSON.parse(sanitizedResult);
    console.log('Parsed result:', parsedResult);

    // Remove incomplete questions
    parsedResult.questions = parsedResult.questions.filter(
      (question: any) => question.question && question.options && question.answer !== undefined
    );
    console.log('Filtered result:', parsedResult);

    return parsedResult;
  } catch (error) {
    console.error('Error in parsing or filtering:', error);
    throw new Error('Failed to parse or filter response JSON');
  }
}
