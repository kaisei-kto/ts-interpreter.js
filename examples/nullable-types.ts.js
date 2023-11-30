const emptyObj = {};
/**
 * @type {undefined}
 */
const anUndefinedProperty = emptyObj['anything'];
const searchResults = {
	video: { name: 'LEGO Movie' },
	text: null,
	audio: { name: 'LEGO Movie Soundtrack' },
};
/**
 * @typedef PotentialString
 * @type {string|undefined|null}
 */
/**
 * @note declare function is not fully accurate
 * @typedef {Function} getID
 * @returns {PotentialString}
 */
const userID = getID();
console.log('User Logged in: ', userID.toUpperCase());
const definitelyString1 = getID();
const definitelyString2 = getID();
if (userID) {
	console.log(userID);
}
const voidFunction = () => {};
const resultOfVoidFunction = voidFunction();
