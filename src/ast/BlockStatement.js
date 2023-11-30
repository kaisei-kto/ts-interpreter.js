const { packages } = require('../index');

/**
 *
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").BlockStatement} ast
 */
module.exports = (ast) => {
	const body = ast.body.map((o) => packages[o.type](o));

	for (let i = 0; i < body.length; i++) {
		const o = body[i];
		if (typeof o === 'object') {
			if ('declaration' in o) {
				body[i] = `${typeof o.typings === 'string' ? `${o.typings}\n` : ''}${o.declaration}`;
			} else if (Array.isArray(o)) {
				body[i] = o.declaration;
			}
		}
	}

	const variables = ast.parent?.parent?.parent?.variables;
	if (Array.isArray(variables)) {
		body.unshift(...[...variables].map(o => (o = o.split('\n').pop()) && `this.${o.split(';').shift()} = ${o}`));
	}

	return body.length > 0 ? `{\n${body.join('\n')}\n}` : '{}';
};
