const caller = require('caller');
const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSInterfaceBody} ast 
 */
module.exports = (ast) => {
	return ast.body.map(o => packages[o.type](o));
};