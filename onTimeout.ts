export const DEFAULT_TIMEOUT_MS = 10;

interface Unsubscribe {
  (): void;
}

export function onTimeout(
  callback: () => void,
  msec = DEFAULT_TIMEOUT_MS
): Unsubscribe {
  const timeoutId = setTimeout(callback, msec);
  return () => clearTimeout(timeoutId);
}
