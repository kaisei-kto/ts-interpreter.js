const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ForOfStatement} ast 
 */
module.exports = ast => {
	let left = packages[ast.left.type]((ast.left.parent = ast) && ast.left);
	const right = packages[ast.right.type]((ast.right.parent = ast) && ast.right);
	const body = packages[ast.body.type]((ast.body.parent = ast) && ast.body);

	left = Array.isArray(left) ? left.at(0).declaration : left.declaration;

	return (`for (${ast?.left?.kind || 'let'} ${left} of ${right}) ${body}`);
};