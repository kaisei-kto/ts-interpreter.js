const caller = require('caller');
const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").SpreadElement} ast 
 */
module.exports = ast => {
	console.log(caller())
	return `...${packages[ast.argument.type]((ast.argument.parent = ast) && ast.argument)}`;
}