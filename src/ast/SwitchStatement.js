const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").SwitchStatement} ast 
 */
module.exports = ast => {
	const discriminant = packages[ast.discriminant.type]((ast.discriminant.parent = ast) && ast.discriminant);
	const cases = ast.cases.map(o => packages[o.type]((o.parent = ast) && o)).join('\n');

	return `switch(${discriminant}) {\n${cases}\n}`;
};