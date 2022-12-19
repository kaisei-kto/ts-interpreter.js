/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ForInStatement} ast 
 */
module.exports = ast => {
	const left = require(`./${ast.left.type}`)(ast.left);
	const right = require(`./${ast.right.type}`)(ast.right);
	const body = require(`./${ast.body.type}`)(ast.body);
	
	return (`for (${left} in ${right}) ${body}`)
}