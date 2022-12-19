const BlockStatement = require('./BlockStatement');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").FunctionDeclaration} ast 
 */
module.exports = (ast) => {
	let fheader = `${ast.async ? 'async ' : ''}function${ast.generator ? '*' : ''}`;
	let fparams = ast.params.map(o => require(`./${o.type}`)(o)).join(', ');

	if (ast.parent) {
		fheader = `${ast.id.name} = ${fheader}`
	} else {
		fheader = `${fheader} ${ast.id.name}`
	}

	return `${fheader}(${fparams}) ${BlockStatement(ast.body)}`;
}