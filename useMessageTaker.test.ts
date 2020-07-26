import { onTimeout } from "./onTimeout";
import { useMessageTaker } from "./useMessageTaker";

describe("useMessageTaker", () => {
  describe("use case", () => {
    it("test1", async () => {
      const [notify, take] = useMessageTaker<string>();

      const unsub1 = onTimeout(() => notify("A"), 20);
      const unsub2 = onTimeout(() => notify("B"), 10);

      await expect(take()).resolves.toStrictEqual("B");
      await expect(take()).resolves.toStrictEqual("A");

      [
        unsub1, //
        unsub2,
      ].forEach((unsubscribe) => unsubscribe());
    });

    it("test4", async () => {
      const [_notify, take] = useMessageTaker<string>({ timeoutMS: 0 });
      await expect(take()).rejects.toThrowError("timeout");
    });
  });
});
