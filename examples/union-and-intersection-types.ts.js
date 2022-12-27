(function () {
	/**
	 * @typedef StringOrNumber
	 * @type {string|number}
	 */
	/**
	 * @typedef ProcessStates
	 * @type {"open"|"closed"}
	 */
	/**
	 * @typedef OddNumbersUnderTen
	 * @type {1|3|5|7|9}
	 */
	/**
	 * @typedef AMessyUnion
	 * @type {"hello"|156|{ error: true }}
	 */
	/**
	 * @typedef WindowStates
	 * @type {"open"|"closed"|"minimized"|string}
	 */
	/**
	 * @interface
	 * @typedef ErrorHandling
	 * @type {object}
	 * @property {boolean} success
	 * @property {{ message: string }} error
	 */
	/**
	 * @interface
	 * @typedef ArtworksData
	 * @type {object}
	 * @property {{ title: string }[]} artworks
	 */
	/**
	 * @interface
	 * @typedef ArtistsData
	 * @type {object}
	 * @property {{ name: string }[]} artists
	 */
	/**
	 * @typedef ArtworksResponse
	 * @type {ArtworksData & ErrorHandling}
	 */
	/**
	 * @typedef ArtistsResponse
	 * @type {ArtistsData & ErrorHandling}
	 */
	/**
	 * @param {ArtistsResponse} response
	 */
	const handleArtistsResponse = (response) => {
		if (response.error) {
			console.error(response.error.message);
			return;
		}
		console.log(response.artists);
	};
	/**
	 * @interface
	 * @typedef CreateArtistBioBase
	 * @type {object}
	 * @property {string} artistID
	 * @property {boolean} thirdParty
	 */
	/**
	 * @typedef CreateArtistBioRequest
	 * @type {CreateArtistBioBase & { html: string }|{ markdown: string }}
	 */
	/**
	 * @type {CreateArtistBioRequest}
	 */
	const workingRequest = {
		artistID: 'banksy',
		markdown: 'Banksy is an anonymous England-based graffiti artist...',
	};
	/**
	 * @type {CreateArtistBioRequest}
	 */
	const badRequest = { artistID: 'banksy' };
	return module.exports;
})();
