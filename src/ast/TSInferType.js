const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSInferType} ast 
 */
module.exports = ast => {
	return `infer ${packages[ast.typeParameter.type]((ast.typeParameter.parent = ast) && ast.typeParameter)}`;
};