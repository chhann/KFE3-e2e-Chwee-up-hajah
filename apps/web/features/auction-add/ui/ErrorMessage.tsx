export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <div className="my-1 ml-1 text-xs text-red-500">{message}</div>;
}
