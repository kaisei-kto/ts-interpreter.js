/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").MetaProperty} ast 
 */
module.exports = ast => {
	return `${require(`./${ast.meta.type}`)(ast.meta)}.${require(`./${ast.property.type}`)(ast.property)}`;
}