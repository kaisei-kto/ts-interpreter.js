const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ClassExpression} ast 
 */
module.exports = ast => {
	return `class${ast.id ? ' ' + packages[ast.id.type]((ast.id.parent = ast) && ast.id) : ''} ${packages[ast.body.type]((ast.body.parent = ast) && ast.body)}`;
}