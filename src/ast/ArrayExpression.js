const caller = require('caller');
const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ArrayExpression} ast 
 */
module.exports = ast => {
	// console.log(ast.parent?.type || caller())
	return `${!ast.parent ? ';' : ''}[${ast.elements.map(o => packages[o.type]((o.parent = ast) && o)).join(', ')}]`;
};