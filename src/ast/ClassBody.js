const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ClassBody} ast 
 */
module.exports = ast => {
	const body = `{ ${ast.body.map(o => {
		let builder = []
		const r = packages[o.type]((o.parent = ast) && o);

		let count = 0;
		while ((decorator = o?.decorators?.at(0))) {
			const start = decorator?.loc.start;
			const ostart = o.loc.start;
			if (start.line <= (ostart.line + count)) {
				builder.push(`@${packages[decorator.expression.type](decorator.expression)}`);
				o.decorators?.shift()
				count += 1;
			} else {
				break;
			}
		}

		builder.push(r);

		if (o.type.startsWith('TS')) {
			// console.log(o, packages[o.type](o))
		}

		return builder.join('\n');
	}).join('\n')} };`;

	return body;
}