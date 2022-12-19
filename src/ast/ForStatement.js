/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").ForStatement} ast 
 */
module.exports = ast => {
	const init = ast.init ? require(`./${ast.init.type}`)(ast.init) : '';
	const test = ast.test ? require(`./${ast.test.type}`)(ast.test) : '';
	const update = ast.update ? require(`./${ast.update.type}`)(ast.update) : '';
	const body = require(`./${ast.body.type}`)(ast.body);
	return (`for (${init}; ${test}; ${update}) ${body}`);
}