import * as pkg from "./index";

it("name", () => {
  expect(pkg.name).toStrictEqual("template-ts-module");
});

it("version", () => {
  expect(pkg.version).toStrictEqual("1.0.0");
});

it("onTimeout", () => {
  expect(typeof pkg.onTimeout).toStrictEqual("function");
});

it("import keys", () => {
  expect(Object.keys(pkg).sort()).toStrictEqual([
    "name",
    "onTimeout",
    "version",
  ]);
});
