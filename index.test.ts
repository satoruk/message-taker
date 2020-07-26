import * as pkg from "./index";

it("name", () => {
  expect(pkg.name).toStrictEqual("message-taker");
});

it("version", () => {
  expect(typeof pkg.version).toStrictEqual("string");
});

it("onTimeout", () => {
  expect(typeof pkg.onTimeout).toStrictEqual("function");
});

it("MessageTaker", () => {
  expect(typeof pkg.MessageTaker).toStrictEqual("function");
});

it("useMessageTaker", () => {
  expect(typeof pkg.useMessageTaker).toStrictEqual("function");
});

it("import keys", () => {
  expect(Object.keys(pkg).sort()).toStrictEqual([
    "MessageTaker",
    "name",
    "onTimeout",
    "useMessageTaker",
    "version",
  ]);
});
