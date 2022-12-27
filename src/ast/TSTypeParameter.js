const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeParameter} ast 
 */
module.exports = ast => {
	let builder = [ packages[ast.name.type]((ast.name.parent = ast) && ast.name) ];

	if (ast.constraint) {
		builder.push('in')
		builder.push(packages[ast.constraint.type]((ast.constraint.parent = ast) && ast.constraint));
	}

	return builder.join(' ');
}