const { packages } = require('../index');
const { js_docs, log } = require('../utils');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").VariableDeclaration} ast 
 */
module.exports = (ast) => {
	const v = !ast.parent ? ast.kind + ' ' : '';
	const result = ast.type !== 'VariableDeclaration' ? packages[ast.type](ast) : ast.declarations.map(o => {
		const identifier = packages[o.id.type]((o.id.parent = ast) && o.id);
		const { typings, declaration } = packages[o.type]((o.parent = ast) && o);

		if (o.type !== 'VariableDeclarator') {
			log.debug(`Detected an invalid type in the process of VariableDeclaration: ${o}`);
		}

		if (!typings) {
			const typing = o.id?.typeAnnotation;
			if (typing) {
				return {
					identifier,
					typings: js_docs([
						['type', packages[typing.type]((typing.parent = o.id) && typing)]
					]),

					declaration: `${v}${declaration}`
				};
			}
		}

		return {
			identifier,
			typings,
			declaration: `${v}${declaration}`
		};
	});

	return Array.isArray(result) && result.length === 1 ? result.at(0) : result;
};