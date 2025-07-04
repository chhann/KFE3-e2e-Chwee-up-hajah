import { errorMessageComponentStyle } from './styles/ErrorMessage.styles';

export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <div className={errorMessageComponentStyle}>{message}</div>;
}