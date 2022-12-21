import { ErrorResponse, SourceCode, Trace } from "./types";
import { promises, existsSync } from "fs";
import { cache } from "../shared.js";
import { AssertionError } from "assert";

const MAX_CODE_LINES = 6;
const LINE_REGEXP = /at (.+?)\s+\((?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)/;

const parse = (error: Error|AssertionError|SyntaxError|EvalError|TypeError|ReferenceError): ErrorResponse => {
	const { message, name, stack } = error;

	const traces = parseTraces(stack || "");

	return {
		message,
		name,
		traces,
	};
};

const parseTraces = (stack: string): Trace[] => {
	const traces: Trace[] = [];

	if (!stack.length) {
		return [];
	}

	const stacktraces = stack.split("\n").slice(1);
	for (const line of stacktraces) {
		const trace = createTrace(line);
		if (trace) {
			traces.push(trace);
		}
	}

	return (
		traces.slice(0, 25).map((trace) => ({
			...trace,
		})) || []
	);
};

const createTrace = (line: string): Trace | undefined => {
	const lineMatch = line.match(LINE_REGEXP);
	if (!lineMatch) {
		return undefined;
	}

	let functionName: string | undefined;
	let extension: string | undefined;

	if (!lineMatch || lineMatch[0].includes("<anonymous>")) {
		return undefined;
	}

	if (lineMatch[1]) {
		functionName = lineMatch[1];
	}


	const path = (lineMatch[2]?.startsWith("file://")
		? lineMatch[2].substr(7)
		: lineMatch[2]) || lineMatch[1] || lineMatch[0];

	if (path?.endsWith('.ts')) console.log(lineMatch)
	const internal =
		path !== undefined &&
		!path.includes("node_modules/") &&
		!path.includes("node_modules\\") &&
		!path.includes("internal/");

	const filename = lineMatch[2]?.startsWith("file://")
		? lineMatch[2].substr(7)
		: lineMatch[2];

	if (filename) {
		const splitedFilename = filename?.split(".");
		extension = splitedFilename[splitedFilename.length - 1];
	}

	const lineNo = parseInt(lineMatch[3], 10);

	const code = getSourceCode(path, lineNo);

	const properties = {
		filename,
		function: functionName,
		absPath: path,
		lineNo,
		columnNo: parseInt(lineMatch[4], 10) || undefined,
		internal,
		extension,
		...code,
	};

	return properties;
};

const getSourceCode = (
	path: string,
	lineNumber: number
): SourceCode | undefined => {
	const context = cache[path];
	if (!context) {
		return undefined;
	}

	const linesOfCode: string[] = context?.split("\n");

	const code: string = linesOfCode[lineNumber - 1];
	const preCode: string[] = linesOfCode.slice(
		lineNumber - MAX_CODE_LINES,
		lineNumber - 1
	);
	const postCode: string[] = linesOfCode.slice(
		lineNumber,
		lineNumber + MAX_CODE_LINES
	);

	return {
		code,
		preCode,
		postCode,
	};
};

const readFileContext = async (path: string): Promise<string> => {
	let context = "";

	const isExists = existsSync(path);
	if (isExists) {
		context = await promises.readFile(path, "utf8");
	}

	return context;
};

export const stacktrace = {
	parse,
};
