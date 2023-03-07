const { packages } = require('../index');

/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").TSModuleDeclaration} ast 
 */
module.exports = ast => {
	// console.log(ast)
	// return `...${packages[ast.typeAnnotation.type]((ast.typeAnnotation.parent = ast) && ast.typeAnnotation)}`;
	return `const ${packages[ast.id.type]((ast.id.parent = ast) && ast.id)} = (function() {
		${ast.body?.type === 'TSModuleBlock' ? packages['TSModuleBlock']((ast.body.parent = ast) && ast.body) : ''}
		return this
	})();`;
};