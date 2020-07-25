import { onTimeout } from "./onTimeout";
import { MessageTaker, DEFAULT_TIMEOUT_MS } from "./MessageTaker";

describe("MessageTaker", () => {
  describe("constructor", () => {
    it("default", async () => {
      const taker = new MessageTaker<void>();
      expect(taker.timeoutMS).toStrictEqual(DEFAULT_TIMEOUT_MS);
    });

    it("with blank object", async () => {
      const obs = new MessageTaker<void>({});
      expect(obs.timeoutMS).toStrictEqual(DEFAULT_TIMEOUT_MS);
    });

    it("with timeoutMS", async () => {
      const obs = new MessageTaker<void>({ timeoutMS: 100 });
      expect(obs.timeoutMS).toStrictEqual(100);
    });
  });

  describe("use case", () => {
    it("test1", async () => {
      const taker = new MessageTaker<string>();

      const unsub1 = onTimeout(() => taker.notify("A"), 20);
      const unsub2 = onTimeout(() => taker.notify("B"), 10);

      await expect(taker.take()).resolves.toStrictEqual("B");
      await expect(taker.take()).resolves.toStrictEqual("A");

      [
        unsub1, //
        unsub2,
      ].forEach((unsubscribe) => unsubscribe());
    });

    it("test2", async () => {
      const taker = new MessageTaker<string>();

      const unsub1 = onTimeout(() => taker.notify("A"), 20);
      const unsub2 = onTimeout(() => {
        taker.notify("B1");
        taker.notify("B2");
      }, 10);

      await expect(taker.take()).resolves.toStrictEqual("B1");
      await expect(taker.take()).resolves.toStrictEqual("B2");
      await expect(taker.take()).resolves.toStrictEqual("A");

      [
        unsub1, //
        unsub2,
      ].forEach((unsubscribe) => unsubscribe());
    });

    it("test3", async () => {
      const taker = new MessageTaker<string>({ timeoutMS: 0 });
      await expect(taker.take()).rejects.toThrowError("timeout");
    });
  });
});
