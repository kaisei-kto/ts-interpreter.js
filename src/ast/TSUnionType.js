const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSUnionType} ast 
 */
module.exports = ast => {
	return ast.types.map(o => o.type === 'TSLiteralType' ? o.literal.raw : o.type + '???').join('|')
}