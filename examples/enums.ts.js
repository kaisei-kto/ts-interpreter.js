(function () {
	const CompassDirection = { North: 0, East: 1, South: 2, West: 3 };
	const StatusCodes = {
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
		Up: 'UP',
		Down: 'DOWN',
		Left: 'LEFT',
		Right: 'RIGHT',
	};
	const MouseAction = { MouseDown: 0, MouseUpOutside: 1, MouseUpInside: 2 };
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
