const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").AssignmentExpression} ast 
 */
module.exports = ast => {
	const builder = [];
	const value = packages[ast.right.type]((ast.right.parent = ast) && ast.right);
	if (Array.isArray(value)) {
		builder.push(...value);
	} else {
		builder.push(value);
	}

	
	let result = `${packages[ast.left.type]((ast.left.parent = ast) && ast.left)} ${ast.operator} ${builder.join('\n')}${!ast.parent ? ';' : ''}`;
	let type = ast.parent?.type;

	if ([
		'BinaryExpression',
		'UnaryExpression',
		'LogicalExpression'
	].indexOf(type) !== -1) {
		result = `(${result})`;
	}

	return result;
};