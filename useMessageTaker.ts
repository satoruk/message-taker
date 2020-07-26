import { MessageTaker, DEFAULT_TIMEOUT_MS } from "./MessageTaker";
import { setTimeout } from "timers";

interface Notify<T> {
  (payload: T): void;
}
interface Take<T> {
  (): Promise<T>;
}

/**
 * use MessageTaker
 *
 * @example
 * const [notify, take] = useMessageTaker<string>();
 *
 * const unsubscribe1 = onTimeout(() => notify("A"), 20);
 * const unsubscribe2 = onTimeout(() => notify("B"), 10);
 *
 * console.log(await take()); // => "B"
 * console.log(await take()); // => "A"
 *
 * [
 *   unsubscribe1, //
 *   unsubscribe2,
 * ].forEach((unsubscribe) => unsubscribe());
 * @param timeoutMS The time, in milliseconds.
 */
export function useMessageTaker<T>({
  timeoutMS = DEFAULT_TIMEOUT_MS,
}: { timeoutMS?: number } = {}): [Notify<T>, Take<T>] {
  const taker = new MessageTaker<T>({ timeoutMS });

  return [
    (payload: T) => taker.notify(payload), //
    () => taker.take(), //
  ];
}
