(function () {
	const failingResponse = ['Not Found', 404];
	/**
	 * @type {[ string,number ]}
	 */
	const passingResponse = ['{}', 200];
	if (passingResponse[1] === 200) {
		const localInfo = JSON.parse(passingResponse[0]);
		console.log(localInfo);
	}
	passingResponse[2];
	/**
	 * @typedef StaffAccount
	 * @type {[ number,string,string,string? ]}
	 */
	/**
	 * @type {StaffAccount[]}
	 */
	const staff = [
		[0, 'Adankwo', 'adankwo.e@'],
		[1, 'Kanokwan', 'kanokwan.s@'],
		[2, 'Aneurin', 'aneurin.s@', 'Supervisor'],
	];
	/**
	 * @typedef PayStubs
	 * @type {[ StaffAccount,...number[] ]}
	 */
	/**
	 * @type {PayStubs[]}
	 */
	const payStubs = [
		[staff[0], 250],
		[staff[1], 250, 260],
		[staff[0], 300, 300, 300],
	];
	const monthOnePayments = payStubs[0][1] + payStubs[1][1] + payStubs[2][1];
	const monthTwoPayments = payStubs[1][2] + payStubs[2][2];
	const monthThreePayments = payStubs[2][2];
	/**
	 * @TODO {TSDeclareFunction}
	 */
	calculatePayForEmployee(staff[0][0], payStubs[0][1]);
	calculatePayForEmployee(staff[1][0], payStubs[1][1], payStubs[1][2]);
	return module.exports;
})();
