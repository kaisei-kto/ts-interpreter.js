/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSInterfaceDeclaration} ast 
 */
module.exports = ast => {
	let identifier = require(`./${ast.id.type}`)(ast.id);
	const body = require(`./${ast.body.type}`)(ast.body);
	const _extends = (ast.extends ? ast.extends.map(o => require(`./${o.type}`)(o)) : [])[0];

	if (_extends) {
		body.unshift(['extends', _extends]);
	}

	body.unshift([ 'typedef', undefined, identifier ]);
	body.unshift([ 'type', 'object' ]);
	body.unshift([ 'interface' ]);

	return body;
}