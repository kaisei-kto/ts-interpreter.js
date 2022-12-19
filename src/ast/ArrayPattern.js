/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ArrayPattern} ast 
 */
module.exports = ast => {
	// if (ast.decorators || ast.optional) console.log(ast);
	return `[ ${ast.elements.map(o => require(`./${o.type}`)(o)).join(', ')} ]`
}