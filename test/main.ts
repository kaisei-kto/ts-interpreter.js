'use strict';

import './src/constants';
// export * from './src/constants';
// export * from './src/classes';
// import './src/loop';
// import './src/object';
// import './src/labels';
// import './src/operators';
// import './src/functions';
// import './src/functions';
// import './src/functions';

export function whoami(): string|any {
	return 'ts-interpreter.js';
}

console.log('Loaded a ts file;', __filename);