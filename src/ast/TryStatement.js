/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TryStatement} ast 
 */
module.exports = ast => {
	const builder = [`try ${require(`./${ast.block.type}`)(ast.block)}`];

	if (ast.handler) {
		builder.push('catch');
		if (ast.handler.param) {
			builder.push(`(${require(`./${ast.handler.param.type}`)(ast.handler.param)})`);
		}

		builder.push(require(`./${ast.handler.body.type}`)(ast.handler.body));
	}

	if (ast.finalizer) {
		builder.push('finally');

		builder.push(require(`./${ast.finalizer.type}`)(ast.finalizer));
	}

	return builder.join(' ');
}