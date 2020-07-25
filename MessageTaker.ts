import { onTimeout } from "./onTimeout";

type Fact<T> = {
  resolve: (value: T) => void;
};

export const DEFAULT_TIMEOUT_MS = 1000;

export class MessageTaker<T> {
  private stack: Fact<T>[];
  private results: T[];

  public readonly timeoutMS: number;

  constructor({ timeoutMS = DEFAULT_TIMEOUT_MS }: { timeoutMS?: number } = {}) {
    this.timeoutMS = timeoutMS;
    this.stack = [];
    this.results = [];
  }

  notify(payload: T): void {
    this.results.push(payload);
    const len = this.results.length;
    if (len <= this.stack.length) {
      this.stack[len - 1].resolve(payload);
    }
  }

  async take(): Promise<T> {
    return new Promise<T>((rawResolve, reject) => {
      const unsubscribe = onTimeout(
        () => reject(new Error("timeout")),
        this.timeoutMS
      );
      const resolve = (value: T) => {
        unsubscribe();
        rawResolve(value);
      };
      const fact: Fact<T> = {
        resolve,
      };
      this.stack.push(fact);
      const len = this.stack.length;
      if (len <= this.results.length) {
        resolve(this.results[len - 1]);
      }
    });
  }
}
