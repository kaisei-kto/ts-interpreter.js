const { fix_code } = require('./utils');
const { cache } = require('../shared');
const { log } = require('../utils');
const { e_parser } = require('../utils/error-parser');

function handle_exception(error, origin) {
	const event = origin !== 'uncaughtException' ? 'unhandledRejection' : 'uncaughtException';
	const listeners = process.listeners('uncaughtException');

	log.error(error);

	if (error && typeof error === 'object' && 'message' in error && 'name' in error && 'stack' in error) {
		const { stack, path, line, column, message, name } = e_parser(error);
		const src = cache[path];

		if (typeof line === 'number' && typeof src === 'string' && line !== 0) {
			const lines = src.split('\n').slice(Math.max(0, (line - 1) - 5)).map(o => fix_code(o)[0]);
			const prelines = {}
			let count = Math.max(0, (line - 1) - 5)
			let size = 0;
			for (const line of lines) {
				if (size > 10) break;
				prelines[count++] = line;
				size += 1;
			}

			const preline = prelines[line - 1];
			let pre_tabs = 0;
			while (preline.substr(pre_tabs, 4) === '    ') {
				pre_tabs += 4;
			}

			prelines[line - 1] = `${preline.substring(0, pre_tabs)}\x1b[1m\x1b[41m\x1b[37m${preline.substr(pre_tabs)}\x1b[0m`;
			log.error(`\x1b[4m${stack?.split('\n')?.find(line => line.startsWith(name))}\x1b[0m`);
			console.log(`${path}:${line}:${column}\n`);
			console.log(Object.values(prelines).join('\n'))
		}
	}

	if ((listeners.length - 1) === 0) {
		process.exit(1);
	}
}

process.on('uncaughtException', handle_exception);

module.exports = handle_exception;