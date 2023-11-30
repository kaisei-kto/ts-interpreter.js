const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ClassDeclaration} ast 
 */
module.exports = ast => {
	const builder = ['class'];
	let identifier;
	let docs = [];
	
	if (ast.abstract) {
		docs.push('abstract');
	}

	if (ast.id) {
		if (ast.parent) {
			builder.unshift((identifier = packages[ast.id.type]((ast.id.parent = ast) && ast.id)) + ' =');
		} else {
			builder.push((identifier = packages[ast.id.type]((ast.id.parent = ast) && ast.id)));
		}
	}

	if (ast.superClass) {
		builder.push('extends');

		builder.push(packages[ast.superClass.type]((ast.superClass.parent = ast) && ast.superClass));
	}


	if (Array.isArray(ast.implements) && ast.implements.length > 0) {
		docs.push(['implements', ...ast.implements.map(o => packages[o.type]((o.parent = ast) && o))]);
	}

	if (docs.length > 0) {
		builder.unshift(require('../utils').js_docs(docs) + '\n');
	}

	return {
		declaration: `${builder.join(' ')} ${packages['ClassBody']((ast.body.parent = ast) && ast.body)}`,
		identifier
	}
};