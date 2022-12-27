const { packages } = require('../index');
const { js_docs } = require('../utils');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").VariableDeclaration} ast 
 */
module.exports = (ast) => {
	const v = !ast.parent ? ast.kind + ' ' : '';
	return ast.type !== 'VariableDeclaration' ? packages[ast.type](ast) : ast.declarations.map(o => {
		let value = packages[o.type]((o.parent = ast) && o)
		if (Array.isArray(value)) {
			return `${value.shift()}\n${!ast.parent ? ast.kind + ' ' : ''}${value.shift()}`;
		}

		const typing = o.id?.typeAnnotation
		if (typing) {
			return `${js_docs([ ['type', packages[typing.type]((typing.parent = o.id) && typing)] ])}\n${v}${value}`;
		}
		return `${v}${value}`;
	}).join(', ');
}