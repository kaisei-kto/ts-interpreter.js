require('clarify-plus');
const { cache } = require('./src/shared');
const { log } = require('./src/utils');
const { readFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const src = require('./src');
const { Script, createContext } = require('vm');
const parser = require('@typescript-eslint/parser');
const { join, dirname, sep } = require('path');
const uglify = require("uglify-js");
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

	check_dir(__dirname);
	mkdirSync(__dirname);
}

/**
 * 
 * @param {string} file_path 
 * @returns {string}
 */
function init (file_path) {
	const content = readFileSync(file_path, 'utf8');
	const ast = parser.parse(content, {
		range: true,
	});
	
	const compiled_code = src.interpret(ast.body);

	const { code, error } = uglify.minify({
		".js": compiled_code
	}, {
		nameCache: {},
		toplevel: true,
		warnings: true,
		mangle: {
			toplevel: false,
			eval: true,
			keep_fnames: true
		},
		module: false,
		keep_fnames: true,
		output: {
			beautify: opts.pretty,
			comments: false,
			braces: true,
			ascii_only: true,
			semicolons: true,
			quote_style: 1,
			shebang: true,
			indent_level: '\t'
		},
		compress: false
	});

	if (error) {
		error.name = file_path + '.runtime'
		throw error
	}

	if (opts.debug) {
		const fpath = join('ts.interpreter.js', ...(file_path + '.js').split(process.cwd()));
		check_dir(fpath);
		writeFileSync(fpath, code);
	}

	cache[file_path +  '.runtime'] = code;

	// console.log(file_path);
	// console.log(output);

	return `${code}`;
}

require.extensions['.ts'] = function(module) {
	const code = init(module.id);
	var sandbox = {};

	for (let k of Object.getOwnPropertyNames(global)) sandbox[k] = global[k];
	const filename = `${module.id}.runtime`;
	sandbox.require = module.require.bind(module);
	sandbox.exports = module.exports;
	sandbox.__filename = module.id;
	sandbox.__dirname = dirname(module.filename);
	sandbox.module = module;
	sandbox.global = sandbox;
	sandbox.root = global;

	const context = createContext(sandbox);

	const script = new Script(code, {
		filename
	});

	try {
		return script.runInContext(context);
	} catch (e) {
		const object = {
			code: undefined,
			stack: e?.stack || '',
			message: undefined
		};

		if (String(object.stack.split('\n')[2]).indexOf('^') !== -1) {
			const stack = object.stack.split('\n')
			stack.splice(0, 3);

			while (stack[0] === '') {
				stack.shift();
			}

			if (stack[1].indexOf('.ts.runtime:') !== -1) {
				const lstack = stack[1];
				const index = lstack.indexOf('at ') + 3;
				const astack = lstack.split('');
				const fpart = astack.splice(0, index)
				const new_stack = `${fpart.join('')}runtime_compiler (${astack.join('')})`
				stack[1] = new_stack;
			}

			object.message = stack[0].indexOf(': ')  !== -1 ? stack[0].substr(stack[0].indexOf(': ') + 2) : undefined;
			object.stack = stack.join('\n')
		}

		handle_exception(object);
	}
}

const fix_code = (s) => {
	let new_str = '';
	let end = false;
	let count = 0;
	for (let char of s) {
		new_str += !end ? (end = char !== '\t') && char || '    ' : char;

		if (!end) {
			count++;
		}
	}

	return [ new_str, count ];
};

const { stacktrace } = require('./src/stacktrace/parser');
function handle_exception() {
	let handled = false;
	const listeners = process.listeners('uncaughtException');
	try {
		const { traces, message, name } = stacktrace.parse(arguments[0]);

		let { filename, lineNo, columnNo, code, preCode, postCode, function: fname, extension } = traces[0] || {};
		if (typeof lineNo === 'number' && typeof code === 'string' && extension === 'runtime') {
			handled = true;
			const src = cache[filename] || '';
			const [ fixed, count ] = fix_code(code);
			const prcode = preCode?.map(o => fix_code(o)[0]) || [];
			const pscode = postCode?.map(o => fix_code(o)[0]) || [];

			const cscript = [
				...prcode,
				fixed,
				...pscode
			]
			// const lines = src.split('\n');
			// const prelines = {}
			// for (const idx in cscript) {
			// 	prelines[(lineNo - prcode.length) + Number(idx)] = cscript[idx];
			// }

			// const lcount = lines.length - 2;
			// const offset = lineNo - prcode.length;
			// const preoffset = offset - (offset - lcount);
			// console.log(lineNo, lcount, offset, preoffset)
			// console.log(lineNo === offset ? prelines[lineNo - 1] || prelines[offset] : prelines[lineNo]);
			// console.log(message);
			// '\x1b[40m\x1b[31m' + fixed + '\x1b[0m',
			// const lint = await (new ESLint({
			// 	fix: false,
			// 	fixTypes: undefined,
			// 	cache: false,
			// 	cwd: __dirname
			// }).lintText(src));

			// let c = src.split('\n').map(o => fix_code(o)[0]);

			// for (const a of lint) {
			// 	for (const msg of a.messages) {
			// 		if (msg.message.slice(0, -1).split("'").join('') === message) {
			// 			lineNo = msg.line - 1
			// 			break;
			// 		}
			// 	}
			// 	break;
			// }

			// console.log(c[lineNo - 1])
			// console.log(get_offset(lineNo), c[get_offset(lineNo)])

			/**
			 * @TODO make a custom linter to accurately find line number
			 */
			log.error(arguments[0].stack.split('\n')[0])
			console.log(`${filename.slice(0, -8)}:${lineNo}:${columnNo}`)
			console.log(`\x1b[40m\x1b[31m${cscript.join('\n')}\x1b[0m`)
		}
	} catch {
	} finally {
		if ((listeners.length - 1) > 0) {
			// for (const listener of listeners) {
			// 	listener(...arguments);
			// }

			return;
		} else if (!handled) console.error(arguments[0])
	}


	process.exit(1);
}

process.on('uncaughtException', handle_exception);