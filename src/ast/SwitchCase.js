const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").SwitchCase} ast 
 */
module.exports = ast => {
	const consequent = ast.consequent.map(o => packages[o.type](o));

	for (let i = 0; i < consequent.length; i++)
	{
		const c = consequent.at(i);

		if (typeof c === 'object') {
			if (Array.isArray(c)) {
				consequent[i] = c.map(({ declaration }) => declaration).join('\n');
			} else consequent[i] = c.declaration;
		}
	}

	return `${ast.test ? `case ${packages[ast.test.type]((ast.test.parent = ast) && ast.test)}` : 'default'}:\n${consequent.join('\n')}`;
};