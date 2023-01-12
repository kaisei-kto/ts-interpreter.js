const { packages } = require('../index');

/**
 * @interface
 * @type {object}
 * @typedef fff
 * @property {string} name
 */

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSInterfaceBody} ast 
 */
module.exports = (ast) => {
	// console.log(ast);
	return ast.body.map(o => packages[o.type](o));
}