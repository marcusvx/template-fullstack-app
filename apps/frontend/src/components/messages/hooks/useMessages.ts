import { useCallback, useEffect, useMemo, useState } from 'react';
import { Message } from '../../../types/message';
import { fetchMessages, postMessage } from '../api/messagesApi';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown request error';
}

export function useMessages(apiBaseUrl: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [submittingMessage, setSubmittingMessage] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const sortedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [messages],
  );

  const loadMessages = useCallback(async () => {
    setLoadingMessages(true);

    try {
      const data = await fetchMessages(apiBaseUrl);
      setMessages(data);
      setRequestError(null);
    } catch (error) {
      setRequestError(getErrorMessage(error));
    } finally {
      setLoadingMessages(false);
    }
  }, [apiBaseUrl]);

  const createMessage = useCallback(async () => {
    setSubmittingMessage(true);
    setRequestError(null);
    setSuccessMessage(null);

    try {
      const createdMessage = await postMessage(
        apiBaseUrl,
        newMessageContent.trim() || undefined,
      );
      setMessages((current) => [createdMessage, ...current]);
      setNewMessageContent('');
      setSuccessMessage('Message created successfully.');
    } catch (error) {
      setRequestError(getErrorMessage(error));
    } finally {
      setSubmittingMessage(false);
    }
  }, [apiBaseUrl, newMessageContent]);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  return {
    createMessage,
    loadMessages,
    loadingMessages,
    newMessageContent,
    requestError,
    setNewMessageContent,
    sortedMessages,
    submittingMessage,
    successMessage,
  };
}
