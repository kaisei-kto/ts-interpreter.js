/**
 * 
 * @param {import("@typescript-eslint/types/dist/generated/ast-spec").AssignmentPattern} ast 
 */
module.exports = ast => {
	const left = ast.left.name;
	const right = ast.right;

	return `${left} = ${require(`./${right.type}`)(right)}`
}