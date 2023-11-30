const caller = require('caller');
const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSInstantiationExpression} ast 
 */
module.exports = ast => {
	const identifier = packages[ast.expression.type]((ast.expression.parent = ast) && ast.expression);
	// const parameters = ast.typeArguments.params.map(o => packages[o.type]((o.parent = ast) && o));

	// return `/** @type {${identifier}<${parameters.join(', ')}>} */ ${identifier}`;
	return identifier;
};