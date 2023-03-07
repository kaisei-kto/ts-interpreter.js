const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSFunctionType} ast 
 */
module.exports = ast => {
	return `(${ast.params.map(o => {
		const identifier = packages[o.type]((o.parent = ast) && o);
		let type = '';
		if (o.typeAnnotation) {
			type = packages[o.typeAnnotation.type]((o.typeAnnotation.parent = o) && o.typeAnnotation);
		}

		return `${identifier}${type ? `: ${type}` : ''}`;
	})}) => ${ast.returnType ? packages[ast.returnType.type]((ast.returnType.parent = ast) && ast.returnType) : 'undefined'}`;
};