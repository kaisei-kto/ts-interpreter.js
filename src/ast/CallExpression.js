const caller = require('caller');
const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").CallExpression} ast 
 */
module.exports = ast => {
	const callee = packages[ast.callee.type]((ast.callee.parent = ast) && ast.callee);
	let is_anonymous_function_call = [ 'ArrowFunctionExpression', 'FunctionExpression' ].indexOf(ast.callee.type) !== -1;
	if (ast.parent && ['CallExpression', 'ArrowFunctionExpression', 'FunctionExpression'].indexOf(ast.parent.type) !== -1) {
		is_anonymous_function_call = false;
	}

	let header = '';
	let body = '';
	if (Array.isArray(callee)) {
		header = callee.shift();
		body = callee.shift()
	} else body = callee;
	// return `${callee.substr(0, is_anonymous_function_call ? callee.length - 1 : callee.length)}(${ast.arguments.map(o => require(`./${o.type}`)((o.parent = ast) && o)).join(', ')})`
	return `${header ? header + '\n' : ''}${!ast.parent && is_anonymous_function_call ? ';(' : ''}${body}${!ast.parent && is_anonymous_function_call ? ')' : ''}(${ast.arguments.map(o => {
		const value = packages[o.type]((o.parent = ast) && o)
		if (Array.isArray(value)) {
			return `${value.shift()}\n${value.shift()}`;
		}

		return value;
	}).join(', ')})${!ast.parent && is_anonymous_function_call ? ';' : ''}`
}