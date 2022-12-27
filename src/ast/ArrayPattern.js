const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ArrayPattern} ast 
 */
module.exports = ast => {
	// if (ast.decorators || ast.optional) console.log(ast);
	return `[ ${ast.elements.map(o => packages[o.type]((o.parent = ast) && o)).join(', ')} ]`
}