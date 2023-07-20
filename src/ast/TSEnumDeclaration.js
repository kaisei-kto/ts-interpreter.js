const { packages } = require('../index');
const { log } = require('../utils');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSEnumDeclaration} ast
 */
module.exports = ast => {
	let idx = 0;

	const enums = {};

	// build enums
	ast.members.map(o => {
		let name = JSON.stringify(packages[o.type]((o.type.parent = ast) && o));
		if (o.initializer) {
			let initializer = packages[o.initializer.type]((o.initializer.parent = o) && o.initializer);
			let val = undefined;
			if (typeof initializer === 'string') {
				try {
					val = eval(initializer);

					if (o.initializer.type === 'Identifier') throw '';
					if (typeof val !== 'string' && typeof val !== 'number') throw '';
					if (typeof val === 'number' && isNaN(val)) throw '';
				} catch (e) {
					log.error(`Enum Error Warning: Unable to convert value to number/string [${name}: ${initializer}]`);
				}
			}

			if (typeof initializer === 'number') {
				idx = initializer;
				idx++;
			}

			enums[val || initializer] = name;
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