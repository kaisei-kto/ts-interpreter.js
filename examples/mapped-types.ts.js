(function () {
	/**
	 * @interface
	 * @typedef Artist
	 * @type {object}
	 * @property {number} id
	 * @property {string} name
	 * @property {string} bio
	 */
	/**
	 * @interface
	 * @typedef ArtistForEdit
	 * @type {object}
	 * @property {number} id
	 * @property {string} name
	 * @property {string} bio
	 */
	/**
	 * @typedef MyPartialType
	 * @template Type
	 * @type {{ [Property in keyof Type]?: Type[Property] }}
	 */
	/**
	 * @typedef MappedArtistForEdit
	 * @type {MyPartialType<Artist>}
	 */
	/**
	 * @typedef MyPartialTypeForEdit
	 * @template Type
	 * @type {{ [Property in keyof Type]?: Type[Property] } & { id: number }}
	 */
	/**
	 * @typedef CorrectMappedArtistForEdit
	 * @type {MyPartialTypeForEdit<Artist>}
	 */
	return module.exports;
})();
