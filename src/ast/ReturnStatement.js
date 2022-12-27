const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ReturnStatement} ast 
 */
module.exports = ast => {
	const v = ast.argument ? packages[ast.argument.type]((ast.argument.parent = ast) && ast.argument) : '';

	if (Array.isArray(v)) {
		return `${v.shift()}\nreturn${ast.argument ? ' ' + v.shift() : ''}`
	}

	return `return${ast.argument ? ' ' + v : ''}`
}