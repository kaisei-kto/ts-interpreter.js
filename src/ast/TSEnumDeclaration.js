const { packages } = require('../index');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSEnumDeclaration} ast
 */
module.exports = ast => {
	let idx = 0;

	const enums = {};

	const members = ast.members.map(o => {
		let name = JSON.stringify(packages[o.type]((o.type.parent = ast) && o));
		if (o.initializer) {
			let initializer = packages[o.initializer.type]((o.initializer.parent = o) && o.initializer);
			if (typeof initializer === 'number') {
				idx = initializer;
				idx++;
			}

			enums[initializer] = name;
			enums[name] = initializer;
			// builder.push(initializer);
		} else {
			enums[name] = idx;
			enums[idx++] = name;
			// enums[].push(idx++);
		}

		// return builder.join(': ');
	});

	return `const ${packages[ast.id.type]((ast.id.parent = ast) && ast.id)} = { ${Object.keys(enums).map(v => `${v}: ${enums[v]}`).join(', ')} }`;
};