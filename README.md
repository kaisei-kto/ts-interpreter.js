# ts-interpreter.js

#### This package will allow you to use `require` on `.ts` files from any `.js` files using our runtime compiler!

50% of the AST provided are covered and converted into JavaScript

#
# Installation
```
npm i ts-interpreter.js
```

#
### Usage
```js
require('ts-interpreter.js'); // register .ts extension and runtime compiler
const start = Date.now();
console.log(require('./main'), 'index'); // main.ts
console.log(`Took ${Date.now() - start} ms to interpret .ts file into a .js runtime file!`);
```

# Packages
[@typescript-eslint/parser](https://npmjs.com/package/@typescript-eslint/parser)
[vm](https://npmjs.com/package/vm)