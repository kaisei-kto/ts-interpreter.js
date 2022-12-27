const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ForInStatement} ast 
 */
module.exports = ast => {
	const left = packages[ast.left.type](ast.left);
	const right = packages[ast.right.type]((ast.right.parent = ast) && ast.right);
	const body = packages[ast.body.type](ast.body);
	
	return (`for (${left} in ${right}) ${body}`)
}