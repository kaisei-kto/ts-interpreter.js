const fix_code = (s) => {
	let new_str = '';
	let end = false;
	let count = 0;
	for (let char of s) {
		new_str += !end ? (end = char !== '\t') && char || '    ' : char;

		if (!end) {
			count++;
		}
	}

	return [ new_str, count ];
};

module.exports = { fix_code };