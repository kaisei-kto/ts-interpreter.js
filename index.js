require('clarify-plus');
// const { parse } = require('@typescript-eslint/parser');
const { parse } = require('@typescript-eslint/typescript-estree');
// console.log(require('@typescript-eslint/typescript-estree').parse('/* yo */\nconsole.log', {
// 	preserveNodeMaps: true,
// 	comment: true,
// 	tokens: true,
// 	range: true
// }))
const { cache } = require('./src/shared');
const { fix_code } = require('./src/vm/utils');
const { log } = require('./src/utils');
const { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync, lstatSync } = require('fs');
const src = require('./src');
const { join, dirname, basename } = require('path');
const prettier = require('prettier');
const opts = {
	minify: false,
	pretty: true,
	debug: false,
	sample: false
};

global.__tsi_esm = false;

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
 * 
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
			range: true,
			comment: true,
			loc: true,
			ecmaFeatures: {
				globalReturn: false,
				jsx: false
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
			// errorOnTypeScriptSyntacticAndSemanticIssues: true,
			emitDecoratorMetadata: true,
			tokens: true
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
	if (opts.debug) {
		log.debug(`Reading and compiling \x1b[1m${file_path}\x1b[0m to \x1b[1mJavaScript\x1b[0m`);
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

	const code = prettier.format(compiled_code, {
		useTabs: true,
		tabWidth: 4,
		trailingComma: 'all',
		singleQuote: true,
		semi: true,
		filepath: file_path + '.runtime',
		parser: 'babel-ts',
		endOfLine: 'crlf'
	});

	if (opts.debug) {
		const fpath = join('ts.interpreter.js', (file_path + '.js').substr(require.main.path.length));
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