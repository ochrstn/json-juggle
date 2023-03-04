# JSON Juggler

JSON Juggler is a Javascript/Typescript library for manipulating JSON data asynchronously. With JSON Juggler, you can easily update the values of array elements or object fields at any level in the JSON data.

## Installation

You can install JSON Juggler via npm by running the following command in your terminal:

```bash
npm install json-juggler
```

## Usage

JSON Juggler exports one function called manipulate. The function takes three arguments:

```js
manipulate(data, jsonpath, callback, options);
```

- `data` - The JSON data to manipulate.
- `jsonpath` - The JSONPath expression to select the elements to manipulate.
- `updateFn` - The function to apply to the selected elements. It takes one argument, the current value of the element, and should return the new value of the element.
- `options` - An optional object that specifies additional options for the manipulation. Currently, the only supported option is clone, which determines whether to clone the original data or manipulate it directly. The default value is false, which means to manipulate the original data directly.
  JSON Juggler returns a Promise that resolves to the manipulated JSON data.

You can use asynchronous functions such as fetch or database operations as the updateFn. The manipulate function will return a Promise that resolves with the updated data when all updates are complete.

Here are some examples of how to use JSON Juggler:

```js
const { manipulate } = require('json-juggler');

const data = [1, 2, 3];
const result = await manipulate(data, '$[*]', (value) => {
  return value - 1;
});
// result = [0, 1, 2]

const data = { list: [1, 2, 3] };
const result = await manipulate(data, 'list[*]', (value) => {
  return value - 1;
});
// result = { list: [0, 1, 2] }

const data = [
  { id: 'item1', name: 'Item 1' },
  { id: 'item2', name: 'Item 2' },
  { id: 'item3', name: 'Item 3' },
];
const result = await manipulate(data, '$[*]', (value) => {
  return { ...value, version: 0 };
});
// result = [
//   { id: "item1", name: "Item 1", version: 0 },
//   { id: "item2", name: "Item 2", version: 0 },
//   { id: "item3", name: "Item 3", version: 0 },
// ]

const data = {
  a: 1,
  b: {
    c: 2,
  },
  d: [1, 2, 3],
};
const result = await manipulate(data, 'b.c', (value) => {
  return value + 1;
});
// result = {
//   a: 1,
//   b: {
//     c: 3,
//   },
//   d: [1, 2, 3],
// }

const data = {
  a: 1,
};
const result = await manipulate(data, 'a', (value) => {
  return value + 1;
});
// result = {
//   a: 2,
// }
// data = {
//   a: 2,
// }

const data = {
  a: 1,
};
const result = await manipulate(
  data,
  'a',
  (value) => {
    return value + 1;
  },
  { clone: true }
);
// result = {
//   a: 2,
// }
// data = {
//   a: 1
```

## Maturity

This library is currently in progress and does not support every JSONPath syntax. It is also subject to change in the future. While the library is functional and has been tested, it may not be suitable for production use yet. If you encounter any issues or have any suggestions for improvement, please open an issue or submit a pull request.

## License

This library is released under the MIT License.

## Contributions

Contributions are welcome! If you want to improve the functionality of this library, feel free to submit a pull request. If you find a bug, please open an issue.
