/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").IfStatement} ast 
 */
module.exports = ast => {
	return `if (${require(`./${ast.test.type}`)(ast.test)}) ${require(`./${ast.consequent.type}`)(ast.consequent)}${ast.alternate ? ' else ' + require(`./${ast.alternate.type}`)(ast.alternate) : ''}`
}