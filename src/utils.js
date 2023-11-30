const caller = require('caller');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { inspect } = require('node:util');

let is_debug = false;
try {
	is_debug = JSON.parse(readFileSync('ts-interpreter.json', 'utf8')).debug;
} catch { }


const log = {};
const title = 'ts-interpreter';

// const colors = {};
// colors.Reset = "\x1b[0m"
// colors.Bright = "\x1b[1m"
// colors.Dim = "\x1b[2m"
// colors.Underscore = "\x1b[4m"
// colors.Blink = "\x1b[5m"
// colors.Reverse = "\x1b[7m"
// colors.Hidden = "\x1b[8m"

// colors.FgBlack = "\x1b[30m"
// colors.FgRed = "\x1b[31m"
// colors.FgGreen = "\x1b[32m"
// colors.FgYellow = "\x1b[33m"
// colors.FgBlue = "\x1b[34m"
// colors.FgMagenta = "\x1b[35m"
// colors.FgCyan = "\x1b[36m"
// colors.FgWhite = "\x1b[37m"

// colors.BgBlack = "\x1b[40m"
// colors.BgRed = "\x1b[41m"
// colors.BgGreen = "\x1b[42m"
// colors.BgYellow = "\x1b[43m"
// colors.BgBlue = "\x1b[44m"
// colors.BgMagenta = "\x1b[45m"
// colors.BgCyan = "\x1b[46m"
// colors.BgWhite = "\x1b[47m"
const colors = {
	info: ['\x1b[40m\x1b[32m'],
	debug: ['\x1b[40m\x1b[34m'],
	error: ['\x1b[40m\x1b[31m'],
	reset: '\x1b[0m'
};

function build_console(label) {
	return function () {
		if (label === 'debug' && !is_debug) {
			if (caller() !== join(__dirname, '..', 'cli.js')) return;
		}
		
		arguments = Array.from(arguments);
		const builder = [`[${colors[label].join('')}${title}${colors.reset}]`];

		if (arguments[0]) {
			const arg = arguments.shift();
			builder.push(typeof arg !== 'object' ? arg : inspect(arg, false, undefined, true));
		}

		console.log(builder.join(' '), ...arguments);
	};
}

log.debug = build_console('debug');
log.error = build_console('error');
log.info = build_console('info');

function js_docs(props) {
	const docs = ['/**'];
	// console.log(caller());
	// console.log(props);
	for (const [key, value, name] of props) {
		docs.push(` * @${key}${key === 'template' ? ' ' + (value ?? '') : value !== undefined ? ` {${value}}` : ''}${name ? ' ' + name : ''}`);
	}

	docs.push(' */');

	return docs.join('\n');
}

module.exports = { js_docs, log };