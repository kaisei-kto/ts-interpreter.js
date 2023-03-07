(function () {
	const CompassDirection = {
		0: 'North',
		1: 'East',
		2: 'South',
		3: 'West',
		North: 0,
		East: 1,
		South: 2,
		West: 3,
	};
	const StatusCodes = {
		200: 'OK',
		400: 'BadRequest',
		401: 'Unauthorized',
		402: 'PaymentRequired',
		403: 'Forbidden',
		404: 'NotFound',
		OK: 200,
		BadRequest: 400,
		Unauthorized: 401,
		PaymentRequired: 402,
		Forbidden: 403,
		NotFound: 404,
	};
	const startingDirection = CompassDirection.East;
	const currentStatus = StatusCodes.OK;
	const okNumber = StatusCodes.OK;
	const okNumberIndex = StatusCodes['OK'];
	const stringBadRequest = StatusCodes[400];
	const GamePadInput = {
		UP: 'Up',
		Up: 'UP',
		DOWN: 'Down',
		Down: 'DOWN',
		LEFT: 'Left',
		Left: 'LEFT',
		RIGHT: 'Right',
		Right: 'RIGHT',
	};
	const MouseAction = {
		0: 'MouseDown',
		1: 'MouseUpOutside',
		2: 'MouseUpInside',
		MouseDown: 0,
		MouseUpOutside: 1,
		MouseUpInside: 2,
	};
	/**
	 * @param {MouseAction} action
	 */
	const handleMouseAction = (action) => {
		switch (action) {
			case MouseAction.MouseDown:
				console.log('Mouse Down');
				break;
		}
	};
	return module.exports;
})();
