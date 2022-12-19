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
	return ast.body.map(o => require(`./${o.type}`)(o));
}