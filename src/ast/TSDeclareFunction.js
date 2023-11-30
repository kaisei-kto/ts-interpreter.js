const { packages } = require('../index');
const { js_docs } = require('../utils');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSDeclareFunction} ast 
 */
module.exports = ast => {
	const identifier = packages[ast.id.type]((ast.id.parent = ast) && ast.id);
	// console.log(ast);

	const typings = js_docs([
		[ 'note', undefined, 'declare function is not fully accurate' ],
		[ 'typedef', 'Function', identifier ],
		...ast.params.map(o => [
			'param',
			o?.typeAnnotation?.type ? packages[o.typeAnnotation.type]((o.typeAnnotation.parent = o) && o.typeAnnotation) : 'any',
			packages[o.type]((o.parent = ast) && o)
		]),
		[ 'returns', ast.returnType ? packages[ast.returnType.type]((ast.returnType.parent = ast) && ast.returnType) : 'undefined', '' ]
	]);

	return typings;
	// return `/**\n* @TODO {TSDeclareFunction}\n*/`;
};