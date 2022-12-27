const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSConditionalType} ast 
 */
module.exports = ast => {
	const builder = [];

	builder.push(packages[ast.checkType.type]((ast.checkType.parent = ast) && ast.checkType));
	builder.push(`extends ${packages[ast.extendsType.type]((ast.extendsType.parent = ast) && ast.extendsType)}`);
	builder.push(`? ${packages[ast.trueType.type]((ast.trueType.parent = ast) && ast.trueType)}`);
	builder.push(`: ${packages[ast.falseType.type]((ast.falseType.parent = ast) && ast.falseType)}`);
	
	return builder.join(' ');
}