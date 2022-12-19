require('../index'); // register .ts extension by requiring the index file from parent directory
const start = Date.now();
console.log(require('./main'), 'index');
console.log(`Took ${Date.now() - start} ms to interpret a file!`);