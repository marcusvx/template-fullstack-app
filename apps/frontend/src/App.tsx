import { useState } from 'react';

export function App() {
  const [statusMessage, setStatusMessage] = useState('Not connected yet');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkBackendConnection = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/health/ready`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as { status?: string; probe?: string };
      setStatusMessage(
        `Backend ${data.probe ?? 'readiness'} probe responded with status: ${data.status ?? 'unknown'}`,
      );
    } catch (requestError) {
      const message =
        requestError instanceof Error ? requestError.message : 'Unknown request error';
      setError(message);
      setStatusMessage('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-slate-900 px-6 py-4 text-white shadow-sm">
        <h1 className="text-lg font-semibold">template Scaffold</h1>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-8">
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">React + Vite + Tailwind CSS</h2>
          <p>
            This frontend app is ready to connect with the NestJS API in{' '}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">apps/backend</code>.
          </p>
          <p>
            API URL from env:{' '}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">
              {import.meta.env.VITE_API_BASE_URL}
            </code>
          </p>
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            onClick={checkBackendConnection}
            type="button"
          >
            {loading ? 'Checking...' : 'Test Backend Connection'}
          </button>
          <div
            className={`rounded-md border px-4 py-3 text-sm ${
              error
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
            role="status"
          >
            {statusMessage}
          </div>
        </section>
      </main>
    </div>
  );
}
