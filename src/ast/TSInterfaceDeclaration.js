const { packages } = require('../index');
const { js_docs } = require('../utils');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSInterfaceDeclaration} ast 
 */
module.exports = ast => {
	let identifier = packages[ast.id.type](ast.id);
	const body = packages[ast.body.type](ast.body);
	const _extends = (ast.extends ? ast.extends.map(o => packages[o.type](o)) : [])[0];

	if (_extends) {
		body.unshift(['extends', _extends]);
	}

	body.unshift([ 'typedef', undefined, identifier ]);
	body.unshift([ 'type', 'object' ]);
	if (ast.typeParameters) body.unshift([ 'template', packages[ast.typeParameters.type]((ast.typeParameters.parent = ast) && ast.typeParameters) ]);
	body.unshift([ 'interface' ]);

	return !ast.parent ? js_docs(body) : body;
}