(function () {
	/**
	 * @typedef TimingEvent
	 * @type {{ name: "start", userStarted: boolean }|{ name: "closed", duration: number }}
	 */
	/**
	 * @param {TimingEvent} event
	 */
	const handleEvent = (event) => {
		switch (event.name) {
			case 'start':
				const initiatedByUser = event.userStarted;
				break;
			case 'closed':
				const timespan = event.duration;
				break;
		}
	};
	/**
	 * @typedef APIResponses
	 * @type {{ version: 0, msg: string }|{ version: 1, message: string, status: number }|{ error: string }}
	 */
	/**
	 * @param {APIResponses} response
	 */
	const handleResponse = (response) => {
		if ('error' in response) {
			console.error(response.error);
			return;
		}
		if (response.version === 0) {
			console.log(response.msg);
		} else if (response.version === 1) {
			console.log(response.status, response.message);
		}
	};
	return module.exports;
})();
