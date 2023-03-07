const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").BlockStatement} ast 
 */
module.exports = ast => {
	const body = ast.body.map(o => packages[o.type](o));

	return body.length > 0 ? `{\n${body.join('\n')}\n}` : '{ }';
};