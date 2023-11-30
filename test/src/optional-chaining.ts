type AlbumAPIResponse = {
	title: string;
	artist?: {
		name: string;
		bio?: string;
		previousAlbums?: string[];
	};
};

let album: AlbumAPIResponse = undefined;

// Instead of:
//const maybeArtistBio = album.artist && album.artist.bio;

// ?. acts differently than && on "falsy" values: empty string, 0, NaN, false
const artistBio = album?.artist?.bio;

// optional chaining also works with the [] operators when accessing elements
const maybeArtistBioElement = album?.['artist']?.['bio'];
const maybeFirstPreviousAlbum = album?.artist?.previousAlbums?.[0];

interface OptionalFunction {
	bar?: () => number;
}

const foo: OptionalFunction = {};
const bat = foo.bar?.(); // number | undefined
