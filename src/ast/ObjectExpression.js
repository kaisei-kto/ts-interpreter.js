const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ObjectExpression} ast 
 */
module.exports = ast => {
	const object = ast.properties.length > 0 ? `{ ${ast.properties.map(o => packages[o.type]((o.parent = ast) && o)).join(',\n')} }` : '{}'

	// console.log(object);
	return object;
}