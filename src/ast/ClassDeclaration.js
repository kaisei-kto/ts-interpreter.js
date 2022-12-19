/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ClassDeclaration} ast 
 */
module.exports = ast => {
	const builder = [ 'class' ];
	let docs = []

	if (ast.abstract) {
		docs.push('abstract');
	}

	if (ast.id) {
		if (ast.parent) {
			builder.unshift(require(`./${ast.id.type}`)(ast.id) + ' =');
		} else {
			builder.push(require(`./${ast.id.type}`)(ast.id));
		}
	}

	if (ast.superClass) {
		builder.push('extends');

		builder.push(require(`./${ast.superClass.type}`)(ast.superClass));
	}


	if (ast.implements) {
		docs.push([ 'implements', ...ast.implements.map(o => require(`./${o.type}`)(o)) ]);
	}

	if (docs.length > 0) {
		builder.unshift(require('../utils').js_docs(docs) + '\n')
	}

	return `${builder.join(' ')} ${require('./ClassBody')(ast.body)}`;
}