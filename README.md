# ts-interpreter.js [ TypeScript Runtime Compiler ]

#### This package will allow you to use `require` on `.ts` files from any `.js` files using our runtime compiler!

#
# Installation
```
npm i ts-interpreter.js
```

# Coverage
- [x] Array / Object methods
- [x] Class methods
- [x] `export` / `import` conversion to `module.exports`
- [x] Statements (label, if, while, etc.)
- [x] Try / Catch / Finally handle
- [x] Assignments
- [x] Keywords
- [x] Operators

# Usage
```js
require('ts-interpreter.js'); // register .ts extension and runtime compiler
const start = Date.now();
console.log(require('./main'), 'index'); // main.ts
console.log(`Took ${Date.now() - start} ms to interpret .ts file into a .js runtime file!`);
```

# Packages
[@typescript-eslint/parser](https://npmjs.com/package/@typescript-eslint/parser)

[vm](https://npmjs.com/package/vm)