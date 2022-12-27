# ts-interpreter.js [ TypeScript Runtime Compiler ]
This package will allow you to use `require` on any `.ts` files from any `.js` files using our runtime compiler!

#
# Installation
API
```
npm i ts-interpreter.js
```

CLI - scroll down for CLI usages
```
npm i ts-interpreter.js -g
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
- [x] Expressions

# API Usage
index.js
```js
require('ts-interpreter.js'); // register .ts extension and runtime compiler
const package = require('./main'); // main.ts gets compiled almost instant during runtime

console.log(package.whoami());
```

main.ts
```ts
export function whoami(): string|any {
	return 'ts-interpreter.js';
}
```

# CLI Usage
```
file   : tsi-cli <input.ts> <out.js>
auto   : tsi-cli <input.ts> - # replaces - to <input.ts>.js
console: tsi-cli <input.ts> --
```

# Samples
[Click here to view samples of compiled TS to JS](https://github.com/kaisei-kto/ts-interpreter.js/tree/main/examples)

# Tests & Comparisons
- tsc compiler: 1.159s - 1.381s (8 files)
- ts-node runtime compiler: 1.052s - 1.235s (8 files)
- ts-interpreter.js runtime compiler: 32.527ms - 507.492ms (8 files)

# Packages
[@typescript-eslint/parser](https://npmjs.com/package/@typescript-eslint/parser)

[vm](https://npmjs.com/package/vm)