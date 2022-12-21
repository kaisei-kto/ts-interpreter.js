const { readFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const src = require('./src');
const { Script, createContext } = require('vm');
const parser = require('@typescript-eslint/parser');
const { join, dirname } = require('path');
const uglify = require("uglify-js");
const opts = {
	minify: true,
	pretty: false,
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
	
	const compiled_code = src.interpret(ast.body, opts);

	const { code, error } = uglify.minify({
		".js": compiled_code
	}, {
		nameCache: {},
		toplevel: false,
		mangle: true,
		module: false,
		keep_fnames: false,
		compress: {
			side_effects: true,
			module: true,
			keep_fnames: true,
			drop_console: false,
			passes: 10
		},
		output: {
			beautify: false,
			comments: false,
			braces: true,
			semicolons: true,
		}
	});

	if (error) {
		console.log(compiled_code);
		error.name = file_path + ' (internal)'
		throw error
	}

	if (opts.debug) {
		const fpath = join('ts.interpreter.js', ...(file_path + '.js').split(process.cwd()));
		check_dir(fpath);
		writeFileSync(fpath, code);
	}

	// console.log(file_path);
	// console.log(output);

	return code;
}

require.extensions['.ts'] = function(module) {
	const code = init(module.id);
	var sandbox = {};

	for (let k of Object.getOwnPropertyNames(global)) sandbox[k] = global[k];

	sandbox.require = module.require.bind(module);
	sandbox.exports = module.exports;
	sandbox.__filename = module.id;
	sandbox.__dirname = dirname(module.filename);
	sandbox.module = module;
	sandbox.global = sandbox;
	sandbox.root = global;

	const context = createContext(sandbox, {
		name: module.id + ' (internal)'
	});

	const script = new Script(code, {
		filename: module.id + ' (internal)'
	});

	return script.runInContext(context, {
		filename: module.id + ' (internal)',
	});
}