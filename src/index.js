const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const ast_path = join(__dirname, 'ast');
const packages = new Proxy({}, {
	get: (self, key) => {
		const f = Reflect.get(self, key);

		if (typeof f !== 'function') {
			throw new Error(`${key} does not exist in the ast path`);
		}

		return f;
	}
})

const colors = {};
colors.Reset = "\x1b[0m"
colors.Bright = "\x1b[1m"
colors.Dim = "\x1b[2m"
colors.Underscore = "\x1b[4m"
colors.Blink = "\x1b[5m"
colors.Reverse = "\x1b[7m"
colors.Hidden = "\x1b[8m"

colors.FgBlack = "\x1b[30m"
colors.FgRed = "\x1b[31m"
colors.FgGreen = "\x1b[32m"
colors.FgYellow = "\x1b[33m"
colors.FgBlue = "\x1b[34m"
colors.FgMagenta = "\x1b[35m"
colors.FgCyan = "\x1b[36m"
colors.FgWhite = "\x1b[37m"

colors.BgBlack = "\x1b[40m"
colors.BgRed = "\x1b[41m"
colors.BgGreen = "\x1b[42m"
colors.BgYellow = "\x1b[43m"
colors.BgBlue = "\x1b[44m"
colors.BgMagenta = "\x1b[45m"
colors.BgCyan = "\x1b[46m"
colors.BgWhite = "\x1b[47m"

function log(msg, color) {
    color = color || "black";
    bgc = "White";
    switch (color) {
        case "success":  color = "Green";      bgc = "LimeGreen";       break;
        case "info":     color = "DodgerBlue"; bgc = "Turquoise";       break;
        case "error":    color = colors.FgRed;        bgc = colors.BgBlack;           break;
        case "start":    color = "OliveDrab";  bgc = "PaleGreen";       break;
        case "warning":  color = "Tomato";     bgc = "Black";           break;
        case "end":      color = "Orchid";     bgc = "MediumVioletRed"; break;
        default: color = color;
    }

    if (typeof msg == "object") {
        console.log(msg);
    } else if (typeof color == "object") {
        console.log("%c" + msg, "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;");
        console.log(color);
    } else {
		console.log(`${color}${bgc}${msg}${colors.Reset}`)
        // console.log("%c" + msg, "color:" + color + ";font-weight:bold; background-color: " + bgc + ";");
    }
}

/**
 * 
 * @param {import('@typescript-eslint/types/dist/generated/ast-spec').ProgramStatement[]} ast 
 */
function interpret(ast, opts) {
	const code = [];

	for (const object of ast) {
		const { type } = object;
		let fcall = packages[type];

		if (fcall) {
			const line = fcall(object);

			if (typeof line === 'string') {
				// log(type, 'error');
				// console.log(line);
				code.push(line);
			}
		} else throw new ReferenceError(`${type} does not exist in the ast path`);
	}

	const joined = code.join('\n');

	return joined;
}

module.exports = {
	interpret,
	packages
};

for (const f of readdirSync(ast_path)) {
	packages[f.substr(0, f.length - 3)] = require(join(ast_path, f));
}