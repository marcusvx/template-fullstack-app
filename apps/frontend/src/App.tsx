import { useEffect, useMemo, useState } from 'react';

type Message = {
  id: string;
  content: string;
  createdAt: string;
};

export function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
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

  const loadMessages = async () => {
    setLoadingMessages(true);

    try {
      const response = await fetch(`${apiBaseUrl}/messages?skip=0&limit=100`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as Message[];
      setMessages(data);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Unknown request error';
      setRequestError(message);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    void loadMessages();
  }, []);

  const createMessage = async () => {
    setSubmittingMessage(true);
    setRequestError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${apiBaseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessageContent.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const createdMessage = (await response.json()) as Message;
      setMessages((current) => [createdMessage, ...current]);
      setNewMessageContent('');
      setSuccessMessage('Message created successfully.');
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : 'Unknown request error';
      setRequestError(message);
    } finally {
      setSubmittingMessage(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-slate-900 px-6 py-4 text-white shadow-sm">
        <h1 className="text-lg font-semibold">Message Dashboard</h1>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-8">
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Create Message</h2>

          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              void createMessage();
            }}
          >
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Message content
              </span>
              <input
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                maxLength={255}
                onChange={(event) => setNewMessageContent(event.target.value)}
                placeholder="Type a message (leave blank for default)"
                value={newMessageContent}
              />
            </label>
            <button
              className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submittingMessage}
              type="submit"
            >
              {submittingMessage ? 'Creating...' : 'Create message'}
            </button>
          </form>

          {requestError ? (
            <div
              className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="status"
            >
              {requestError}
            </div>
          ) : null}
          {successMessage ? (
            <div
              className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              role="status"
            >
              {successMessage}
            </div>
          ) : null}
        </section>

        <section className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">Messages</h2>
            <button
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              onClick={() => void loadMessages()}
              type="button"
            >
              Refresh
            </button>
          </div>

          {loadingMessages ? (
            <p className="text-sm text-slate-600">Loading messages...</p>
          ) : sortedMessages.length === 0 ? (
            <p className="text-sm text-slate-600">No messages yet.</p>
          ) : (
            <ul className="space-y-3">
              {sortedMessages.map((message) => (
                <li
                  className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3"
                  key={message.id}
                >
                  <p className="font-medium text-slate-900">
                    {message.content}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
