const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").Property} ast 
 */
module.exports = ast => {
	const key = packages[ast.key.type]((ast.key.parent = ast) && ast.key);
	const value = packages[ast.value.type]((ast.value.parent = ast) && ast.value);
	let header = `${ast.computed ? '[' : ''}${key}${ast.computed ? ']' : ''}`;
	let footer = value;
	if (ast.shorthand) {
		return key
	}

	if (ast.kind !== 'init') {
		footer = footer.split(' ')
		footer.splice(footer.findIndex(s => s === 'function'), 1)

		header = `${ast.kind} ${header}`;
		footer = footer.join(' ')
	} else {
		header += ': ';
		if (ast.value.type === 'FunctionExpression') {
			header = value[0] + '\n' + header;
			footer = `${value[1]}`;
		}
	}

	return `${header}${footer}`;
}