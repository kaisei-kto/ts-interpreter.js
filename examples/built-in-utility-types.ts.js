(function () {
	const symbol = Symbol('SymbolObject');
	/**
	 * @interface
	 * @typedef Sticker
	 * @type {object}
	 * @property {number} id
	 * @property {string} name
	 * @property {string} createdAt
	 * @property {string} updatedAt
	 * @property {undefined|string} submitter
	 * @property {Symbol} symbol
	 */
	/**
	 * @typedef StickerUpdateParam
	 * @type {Partial<Sticker>}
	 */
	/**
	 * @typedef StickerFromAPI
	 * @type {Readonly<Sticker>}
	 */
	/**
	 * @typedef NavigationPages
	 * @type {"home"|"stickers"|"about"|"contact"}
	 */
	/**
	 * @interface
	 * @typedef PageInfo
	 * @type {object}
	 * @property {string} title
	 * @property {string} url
	 * @property {string} axTitle
	 */
	/**
	 * @type {Record<NavigationPages, PageInfo>}
	 */
	const navigationInfo = {
		home: { title: 'Home', url: '/' },
		about: { title: 'About', url: '/about' },
		contact: { title: 'Contact', url: '/contact' },
		stickers: { title: 'Stickers', url: '/stickers/all' },
	};
	/**
	 * @typedef StickerSortPreview
	 * @type {Pick<Sticker, "name"|"updatedAt">}
	 */
	/**
	 * @typedef StickerTimeMetadata
	 * @type {Omit<Sticker, "name">}
	 */
	/**
	 * @typedef HomeNavigationPages
	 * @type {Exclude<NavigationPages, "home">}
	 */
	/**
	 * @typedef DynamicPages
	 * @type {Extract<NavigationPages, "home"|"stickers">}
	 */
	/**
	 * @typedef StickerLookupResult
	 * @type {Sticker|undefined|null}
	 */
	/**
	 * @typedef ValidatedResult
	 * @type {NonNullable<StickerLookupResult>}
	 */
	/**
	 * @TODO {TSDeclareFunction}
	 */
	/**
	 * @typedef StickerResponse
	 * @type {ReturnType<typeof getStickerByID>}
	 */
	class StickerCollection {
		/**
		 * @type {Sticker[]}
		 */
		stickers;
	}
	/**
	 * @typedef CollectionItem
	 * @type {InstanceType<typeof StickerCollection>}
	 */
	/**
	 * @typedef AccessiblePageInfo
	 * @type {Required<PageInfo>}
	 */
	return module.exports;
})();
