import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(localStorage.getItem('token'));

const fetchRelatedArtists = async (artist, artistID, cb) => {
    spotifyApi.getArtistRelatedArtists(artistID).then(
        (data) => {
            cb(artist, data.artists);
        },
        (err) => {
            console.log(err);
        }
    );
};
export const fetchArtist = async (artist, cb1, cb2) => {
    spotifyApi.searchArtists(artist).then(
        (data) => {
            let artistID = data.artists.items[0].id;
            let artistName = data.artists.items[0].name;
            spotifyApi.searchTracks(`artist:${artist}`).then(
                (data) => {
                    cb1(data.tracks.items);
                    fetchRelatedArtists(artistName, artistID, cb2);
                },
                (err) => {
                    console.error(err);
                }
            );
        },
        (err) => {
            console.error(err);
        }
    );
};
