const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TemplateLiteral} ast 
 */
module.exports = ast => {
	return `\`${ast.quasis.map(v => {
		const element = packages[v.type](v);
		let expression = ast.expressions.shift();

		if (expression) {
			expression = '${' + packages[expression.type](expression) + '}'
		}

		return expression ? `${element}${expression}` : element
	}).join('')}\``
}