const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSEnumDeclaration} ast
 */
module.exports = ast => {
	let idx = 0;

	const members = ast.members.map(o => {
		let builder = [ packages[o.type]((o.type.parent = ast) && o) ];
		if (o.initializer) {
			let initializer = packages[o.initializer.type]((o.initializer.parent = o) && o.initializer);
			if (typeof initializer === 'number') {
				idx = initializer;
				idx++;
			}

			builder.push(initializer);
		} else {
			builder.push(idx++);
		}

		return builder.join(': ');
	});

	return `const ${packages[ast.id.type]((ast.id.parent = ast) && ast.id)} = { ${members.join(', ')} }`
}