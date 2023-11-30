/**
 * @typedef ValidatedInputString
 * @type {string & { __brand: "User Input Post Validation" }}
 */
const validateUserInput = (input) => {
	const simpleValidatedInput = input.replace(/\</g, '≤');
	return simpleValidatedInput;
};
const printName = (name) => {
	console.log(name);
};
const input = "alert('bobby tables')";
const validatedInput = validateUserInput(input);
printName(validatedInput);
printName(input);
