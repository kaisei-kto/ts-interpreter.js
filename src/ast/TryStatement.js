const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TryStatement} ast 
 */
module.exports = ast => {
	const builder = [`try ${packages[ast.block.type](ast.block)}`];

	if (ast.handler) {
		builder.push('catch');
		if (ast.handler.param) {
			builder.push(`(${packages[ast.handler.param.type](ast.handler.param)})`);
		}

		builder.push(packages[ast.handler.body.type](ast.handler.body));
	}

	if (ast.finalizer) {
		builder.push('finally');

		builder.push(packages[ast.finalizer.type](ast.finalizer));
	}

	return builder.join(' ');
}