import { cn } from './cn';

export const cn = (...inputs: any[]) => {
  return inputs.filter(Boolean).join(' ');
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString();
};

export const formatDateTime = (date: Date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const getFormattedTimeElapsed = (date: Date) => {
  const now = new Date();
  const timeElapsed = now.getTime() - date.getTime();
  const seconds = Math.floor(timeElapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};