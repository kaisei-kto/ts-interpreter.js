interface Square {
	kind: 'square';
	size: number;
}
interface Rectangle {
	kind: 'rectangle';
	width: number;
	height: number;
}
interface Circle {
	kind: 'circle';
	radius: number;
}
interface Triangle {
	kind: 'triangle';
	whatever: number;
}

type Shape = Square | Rectangle | Circle | Triangle;

function assertNever(x: never): never {
	throw new Error('Unexpected object: ' + x);
}

function area(s: Shape) {
	switch (s.kind) {
		case 'square':
			return s.size * s.size;
		case 'rectangle':
			return s.height * s.width;
		case 'circle':
			return Math.PI * s.radius ** 2;
		default:
			return assertNever(s); // Error
		// Argument of type 'Triangle' not assignable to param of type 'never'
	}
}
