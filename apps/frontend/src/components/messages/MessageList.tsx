import { Message } from '../../types/message';
import { MessageItem } from './MessageItem';

type MessageListProps = {
  messages: Message[];
  loading: boolean;
};

export function MessageList({ messages, loading }: MessageListProps) {
  if (loading) {
    return <p className="text-sm text-slate-600">Loading messages...</p>;
  }

  if (messages.length === 0) {
    return <p className="text-sm text-slate-600">No messages yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
}
