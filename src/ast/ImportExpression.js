const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ImportExpression} ast 
 */
module.exports = ast => {
	const src = packages[ast.source.type]((ast.source.parent = ast) && ast.source);
	const quote = src.endsWith('"') ? '"' : "'";
	// console.log(src.substr(0, src.lastIndexOf(quote)) + '.ts' + quote)
	// return `import(${src.substr(0, src.lastIndexOf(quote)) + '.ts' + quote})`
	return `import(${src.substr(0, src.lastIndexOf(quote)) + quote})`
}