require('clarify-plus');
const { cache } = require('./src/shared');
const { fix_code } = require('./src/vm/utils');
const { log } = require('./src/utils');
const { readFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const src = require('./src');
const parser = require('@typescript-eslint/parser');
const { join, dirname } = require('path');
const linter = require('./src/lint');
const prettier = require('prettier');
const { EOL } = require('os');
const opts = {
	minify: true,
	pretty: true,
	debug: false
}

if (opts.debug && !existsSync('ts.interpreter.js')) {
	mkdirSync('ts.interpreter.js');
}

function check_dir(fpath) {
	let __dirname = dirname(fpath);
	if (existsSync(__dirname)) return true;

	console.log(fpath);
	check_dir(__dirname);
	mkdirSync(__dirname);
}

function parse(src) {
	const object = {
		ast: '',
		error: undefined
	}

	try {
		object.ast = parser.parse(src, {
			range: true
		})
	} catch (e) {
		object.ast = undefined
		object.error = e
	}

	return object;
}

/**
 * 
 * @param {string} file_path 
 * @returns {string}
 */
function init (file_path) {
	if (opts.debug) {
		log.debug(`Reading and compiling \x1b[1m${file_path}\x1b[0m to \x1b[1mJavaScript\x1b[0m`);
	}
	const content = readFileSync(file_path, 'utf8');
	const errors = linter(content);

	const { ast, error } = parse(content)

	if (error) {
		if (typeof error === 'object' && typeof error.message === 'string' && typeof error.lineNumber === 'number' && typeof error.column === 'number') {
			const lines = content.split('\n').map(line => fix_code(line)[0]);
			log.error(`CompileError: ${error.message}`);
			console.log(`${file_path}:${error.lineNumber}:${error.column}`);
			console.log('\x1b[1m\x1b[40m\x1b[37m' + lines[error.lineNumber - 1] + '\x1b[0m');
		} else log.error(error);
		process.exit(1);
	}

	const compiled_code = src.interpret(ast.body);

	const code = prettier.format(compiled_code, {
		useTabs: true,
		tabWidth: 4,
		trailingComma: 'all',
		singleQuote: true,
		semi: true,
		filepath: file_path + '.runtime',
		parser: 'babel-flow',
		endOfLine: {
			'\r\n': 'crlf',
			'\r': 'cr',
			'\n': 'lf'
		}[EOL],
		printWidth: 300,
		proseWrap: 'preserve',
		quoteProps: 'preserve'
	})

	// if (error2) {
	// 	error2.name = file_path + '.runtime'
	// 	console.error(error2);
	// 	// process.emit('uncaughtException', error2);
	// 	process.exit(1);
	// }

	if (opts.debug) {
		const fpath = join('ts.interpreter.js', ...(file_path + '.js').split(process.cwd()));
		check_dir(fpath);
		writeFileSync(fpath, code);
	}

	// for handling errors
	cache[file_path] = errors;
	cache[file_path +  '.runtime'] = code;

	return `${code}`;
}

require('./src/vm/index')(init);