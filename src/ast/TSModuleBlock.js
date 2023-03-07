const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSModuleBlock} ast 
 */
module.exports = ast => {
	const body = []

	for (const object of ast.body) {
		if (object.type === 'ExportNamedDeclaration') {
			// console.log(object)
			const exported = packages[object.declaration.type](object.declaration);
			const declaration = object.declaration;

			let identifier;
			if ('id' in declaration) {
				identifier = packages[declaration.id.type]((declaration.id.parent = ast) && object.declaration.id)
			}

			if (declaration.type === 'VariableDeclaration') {
				for (const dec of declaration.declarations) {
					if ('id' in dec) {
						identifier = packages[dec.id.type]((dec.id.parent = ast) && dec.id)
						break;
					}
				}
			}

			if (typeof exported === 'string') {
				body.push(exported);
			}

			body.push(`this.${identifier} = ${identifier}`);
			continue
		}

		// console.log(object)
		const exported = packages[object.type](object)
		// console.log(exported)
		const identifier = packages[object.id.type]((object.id.parent = ast) && object.id)

		if (typeof exported === 'string') {
			body.push(exported);
		}

		// console.log(exported)

		body.push(`this.${identifier} = ${identifier}`);
	}

	return body.join('\n')
};