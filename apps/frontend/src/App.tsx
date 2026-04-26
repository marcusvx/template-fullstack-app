import { MessageForm } from './components/messages/MessageForm';
import { useMessages } from './components/messages/hooks/useMessages';
import { MessageList } from './components/messages/MessageList';

export function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const {
    createMessage,
    loadMessages,
    loadingMessages,
    newMessageContent,
    requestError,
    setNewMessageContent,
    sortedMessages,
    submittingMessage,
    successMessage,
  } = useMessages(apiBaseUrl);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-slate-900 px-6 py-4 text-white shadow-sm">
        <h1 className="text-lg font-semibold">Message Dashboard</h1>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-8">
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Create Message</h2>
          <MessageForm
            content={newMessageContent}
            onContentChange={setNewMessageContent}
            onSubmit={() => void createMessage()}
            submitting={submittingMessage}
          />

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

          <MessageList loading={loadingMessages} messages={sortedMessages} />
        </section>
      </main>
    </div>
  );
}
