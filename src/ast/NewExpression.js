const { packages } = require('../index');

/**
 *
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").NewExpression} ast
 */
module.exports = (ast) => {
	const identifier = packages[ast.callee.type]((ast.callee.parent = ast.callee));
	let statement = `new ${identifier}`;

	if (ast.typeArguments) {
		// console.log(packages[ast.typeArguments.type]((ast.typeArguments.parent = ast) && ast.typeArguments));
		// console.log(ast);
	}

	if (ast.arguments.length !== 0) {
		statement = `${statement.replace(/;+/g, '')}(${ast.arguments
			.map((o) => {
				const value = packages[o.type]((o.parent = ast) && o);

				if (Array.isArray(value)) return value.join('\n');

				return value;
			})
			.join(', ')})`;
	} else statement += '()';

	return statement;
};
