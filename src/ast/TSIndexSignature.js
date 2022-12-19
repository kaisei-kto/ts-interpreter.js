/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSIndexSignature} ast 
 */
module.exports = ast => {
	return ast.parameters.map(o => {
		let index = require(`./${o.type}`)(o)
		if (o.typeAnnotation) {
			// console.log(require('./TSTypeAnnotation')(o.typeAnnotation))
		}

		return index;
	});
}