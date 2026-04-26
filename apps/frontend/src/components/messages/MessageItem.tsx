import { Message } from '../../types/message';

type MessageItemProps = {
  message: Message;
};

export function MessageItem({ message }: MessageItemProps) {
  return (
    <li className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="font-medium text-slate-900">{message.content}</p>
      <p className="mt-1 text-xs text-slate-500">
        {new Date(message.createdAt).toLocaleString()}
      </p>
    </li>
  );
}
