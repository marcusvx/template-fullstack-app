import { Message } from '../../../types/message';

export async function fetchMessages(apiBaseUrl: string): Promise<Message[]> {
  const response = await fetch(`${apiBaseUrl}/messages?skip=0&limit=100`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as Message[];
}

export async function postMessage(
  apiBaseUrl: string,
  content?: string,
): Promise<Message> {
  const response = await fetch(`${apiBaseUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as Message;
}
