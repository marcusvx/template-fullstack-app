type MessageFormProps = {
  content: string;
  onContentChange: (value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
};

export function MessageForm({
  content,
  onContentChange,
  onSubmit,
  submitting,
}: MessageFormProps) {
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Message content</span>
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          maxLength={255}
          onChange={(event) => onContentChange(event.target.value)}
          placeholder="Type a message (leave blank for default)"
          value={content}
        />
      </label>
      <button
        className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={submitting}
        type="submit"
      >
        {submitting ? 'Creating...' : 'Create message'}
      </button>
    </form>
  );
}
