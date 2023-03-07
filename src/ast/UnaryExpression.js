const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").UnaryExpression} ast 
 */
module.exports = ast => {
	// const wrap = ['void', 'typeof', 'delete'].indexOf(ast.operator) !== -1;
	return `${ast.operator}(${packages[ast.argument.type]((ast.argument.parent = ast) && ast.argument)})`;
	// return `${ast.operator}${wrap ? ' (' : ''}${require(`./${ast.argument.type}`)(ast.argument)}${wrap ? ')' : ''}`;
};