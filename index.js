const { readFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');
const src = require('./src');
const { Script, createContext } = require('vm');
const path = require('path');
const { join } = require('path');
const opts = {
	minify: true,
	pretty: false,
	debug: false
}

if (opts.debug && !existsSync('ts.interpreter.js')) {
	mkdirSync('ts.interpreter.js');
}

function check_dir(fpath) {
	var dirname = path.dirname(fpath);
	if (existsSync(dirname)) return true;

	check_dir(dirname);
	mkdirSync(dirname);
}

/**
 * 
 * @param {string} file_path 
 * @returns {string}
 */
function init (file_path) {
	const parser = require('@typescript-eslint/parser');
	const ast = parser.parse(readFileSync(file_path, 'utf8'), {
		range: true,
		sourceType: 'module',
		ecmaVersion: 'latest',
		projectFolderIgnoreList: [ './**' ],
		warnOnUnsupportedTypeScriptVersion: false,
		filePath: file_path,
		loc: true,
		tokens: true
	});
	
	const output = src.interpret(ast.body, opts);

	if (opts.debug) {
		const fpath = join('ts.interpreter.js', ...(file_path + '.js').split(process.cwd()));
		check_dir(fpath);
		writeFileSync(fpath, output);
	}

	return output
}

require.extensions['.ts'] = function(module) {
	const code = init(module.id);
	var sandbox = {};

	for (var k of Object.getOwnPropertyNames(global)) {
		sandbox[k] = global[k];
	}

	sandbox.require = module.require.bind(module);
	sandbox.exports = module.exports;
	sandbox.__filename = module.id;
	sandbox.__dirname = path.dirname(module.filename);
	sandbox.module = module;
	sandbox.global = sandbox;
	sandbox.root = global;

	const context = createContext(sandbox);
	const script = new Script(code);

	return script.runInContext(context);
}