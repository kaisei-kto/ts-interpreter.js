const { packages } = require('../index');
const { log } = require('../utils');

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').TSEnumDeclaration} ast
 */
module.exports = ast => {
	let idx = 0;

	const enums = {};
	let missing = {};

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
					missing[name] = initializer;
					return;
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
	
	for (const [ key, value ] of Object.entries(missing)) {
		const e1 = enums[key];
		const e2 = enums[JSON.stringify(value)];

		if (typeof e1 === 'number' || typeof e2 === 'number') {
			// console.log(key, value, e1,e2);
			enums[key] = typeof e1 === 'number' ? e1 : e2;
		} else {
			log.error(`Enum Error Warning: Unable to convert value to number/string [${key}: ${value}]`);
		}
	}

	return `const ${packages[ast.id.type]((ast.id.parent = ast) && ast.id)} = { ${Object.keys(enums).map(v => `${v}: ${enums[v]}`).join(', ')} }`;
};