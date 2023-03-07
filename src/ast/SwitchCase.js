const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").SwitchCase} ast 
 */
module.exports = ast => {
	return `${ast.test ? `case ${packages[ast.test.type]((ast.test.parent = ast) && ast.test)}` : 'default'}:\n${ast.consequent.map(o => packages[o.type](o)).join('\n')}`;
};