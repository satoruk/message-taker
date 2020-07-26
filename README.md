# message-taker

[![codecov](https://codecov.io/gh/satoruk/message-taker/branch/master/graph/badge.svg)](https://codecov.io/gh/satoruk/message-taker)
![Test Badge]
![Lint Badge]

## Install

```shell
$ yarn add message-taker
```

## Usage

```ts
import { useMessageTaker, onTimeout } from "message-taker";

const sample = async () => {
  const [notify, take] = useMessageTaker<string>();

  const unsubscribe1 = onTimeout(() => notify("A"), 20);
  const unsubscribe2 = onTimeout(() => notify("B"), 10);

  console.log(await take()); // => "B"
  console.log(await take()); // => "A"

  [
    unsubscribe1, //
    unsubscribe2,
  ].forEach((unsubscribe) => unsubscribe());
};
sample();
```

[test badge]: https://github.com/satoruk/message-taker/workflows/Test/badge.svg
[lint badge]: https://github.com/satoruk/message-taker/workflows/Lint%20Code%20Base/badge.svg
