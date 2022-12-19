/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ForStatement} ast 
 */
module.exports = ast => {
	const init = require(`./${ast.init.type}`)(ast.init);
	const test = ast.test ? require(`./${ast.test.type}`)(ast.test) : undefined;
	const update = ast.update ? require(`./${ast.update.type}`)(ast.update) : undefined;
	const body = require(`./${ast.body.type}`)(ast.body);
	return (`for (${init}; ${test ?? ''}; ${update ?? ''}) ${body}`);
}