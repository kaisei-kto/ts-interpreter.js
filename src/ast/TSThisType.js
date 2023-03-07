const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSThisType} ast 
 */
module.exports = ast => {
	// console.log(ast);
	// return `...${packages[ast.typeAnnotation.type]((ast.typeAnnotation.parent = ast) && ast.typeAnnotation)}`;
	return 'this';
};