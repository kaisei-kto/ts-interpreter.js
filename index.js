require('clarify-plus');
const parser = require('@typescript-eslint/typescript-estree').parse;
/**
 * 
 * @param {string} src 
 * @param {import('@typescript-eslint/typescript-estree/dist/parser-options').TSESTreeOptions} options 
 */
function parse(src, options = {}) {
	return parser(src, options);
}
const { cache } = require('./src/shared');
const { fix_code } = require('./src/vm/utils');
const { log } = require('./src/utils');
const { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } = require('node:fs');
const src = require('./src');
const { join, dirname, basename } = require('node:path');
const prettier = require('prettier');
// const p = require('eslint-formatter-pretty');
const opts = {
	minify: false,
	pretty: true,
	debug: false,
	sample: false
};

// global.__tsi_esm = false;

if (opts.debug && !existsSync('ts.interpreter.js')) {
	mkdirSync('ts.interpreter.js');
}

function check_dir(fpath) {
	let __dirname = dirname(fpath);
	if (existsSync(__dirname)) return true;

	// console.log(fpath);
	check_dir(__dirname);
	mkdirSync(__dirname);
}

/**
 * @param {string} src
 * @returns {{
 * ast: import('@typescript-eslint/types').TSESTree.Program,
 * error: any
 * }}
 */
function parse_src(src) {
	const object = {
		ast: undefined,
		error: undefined
	};

	try {
		object.ast = parse(src, {
			tokens: true,
			range: true,
			allowAutomaticSingleRunInference: true
		});

	} catch (e) {
		object.ast = undefined;
		object.error = e;
	}

	return object;
}

/**
 * 
 * @param {string} file_path 
 * @returns {string}
 */
function init(file_path) {
	let t;
	if (opts.debug) {
		log.debug(`Reading and compiling \x1b[1m${file_path}\x1b[0m to \x1b[1mJavaScript\x1b[0m`);
		t = Date.now();
	}
	const content = readFileSync(file_path, 'utf8');

	const { ast, error } = parse_src(content);

	if (error) {
		if (typeof error === 'object' && typeof error.message === 'string' && typeof error.lineNumber === 'number' && typeof error.column === 'number') {
			const lines = content.split('\n').map(line => fix_code(line)[0]);
			log.error(`CompileError: ${error.message}`);
			console.log(`${file_path}:${error.lineNumber}:${error.column}`);
			console.log('\x1b[1m\x1b[40m\x1b[37m' + lines[error.lineNumber - 1] + '\x1b[0m');
		} else log.error(error);
		process.exit(1);
	}

	const compiled_code = src.interpret(ast);

	// let t1 = Date.now();
	const code = prettier.format(compiled_code, {
		useTabs: true,
		tabWidth: 4,
		trailingComma: 'all',
		singleQuote: true,
		semi: true,
		filepath: file_path + '.runtime',
		parser: 'babel-ts',
		endOfLine: 'auto',
		printWidth: 250,
		quoteProps: 'consistent'
	});
	// log.debug(`Took ${Date.now()-t1} to fmt`);

	if (opts.debug) {
		log.debug(`Took \x1b[1m${Date.now() - t} ms\x1b[0m to interpret into \x1b[1mJavaScript\x1b[0m`);
		const fpath = join('ts.interpreter.js', (file_path + '.js').substr(process.cwd().length));
		check_dir(fpath);
		writeFileSync(fpath, code);
	}

	cache[file_path + '.runtime'] = code;

	return `${code}`;
}

require('./src/vm/index')(init);

module.exports = function () {
	const caller = require('caller')();
	if (typeof caller === 'string') {
		const fname = basename(caller);
		const dname = basename(dirname(caller));

		if (fname === 'cli.js' && dname === 'ts-interpreter.js') {
			return init;
		}
	}
};

if (opts.sample) {
	for (const f of readdirSync('examples').filter(f => f.endsWith('.ts'))) {
		const fpath = join('examples', f);

		const code = init(fpath);

		writeFileSync(fpath + '.js', code);
	}
}