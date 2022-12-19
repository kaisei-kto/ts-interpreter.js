/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSTypeParameterDeclaration} ast 
 */
module.exports = ast => {
	return ast.params.map(o => require(`./${o.type}`)(o)).join(', ');
}