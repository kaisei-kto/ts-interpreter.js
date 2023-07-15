require('../index'); // register .ts extension by requiring the index file from parent directory
const package = require('./main'); // main.ts
console.log(package.whoami());