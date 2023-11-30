const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ForInStatement} ast 
 */
module.exports = ast => {
	let left = packages[ast.left.type]((ast.left.parent = ast) && ast.left);
	const right = packages[ast.right.type]((ast.right.parent = ast) && ast.right);
	const body = packages[ast.body.type](ast.body);

	left = Array.isArray(left) ? left.at(0).declaration : left.declaration;

	return (`for (${ast?.left?.kind || 'let'} ${left} in ${right}) ${body}`);
};