/**
 * @interface
 * @typedef ArtworkSearchResponse
 * @type {object}
 * @property {{ name: string, artworks: { name: string, deathdate: string|null, bio: string }[] }[]} artists
 */
/**
 * @interface
 * @typedef Artwork
 * @type {object}
 * @property {string} name
 * @property {string|null} deathdate
 * @property {string} bio
 */
/**
 * @typedef InferredArtwork
 * @type {ArtworkSearchResponse["artists"][0]["artworks"][0]}
 */
