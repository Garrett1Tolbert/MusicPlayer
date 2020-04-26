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
const fetchOtherInfo = async (artistID, cb) => {
    spotifyApi.getArtistTopTracks(artistID, 'US').then(
        (data) => {
            cb(data.tracks.slice(0, 4));
        },
        (err) => {
            console.error(err);
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
                    let filteredData = [];
                    data.tracks.items.forEach((item) => {
                        if (item.preview_url) filteredData.push(item);
                    });
                    if (filteredData.length === 0)
                        fetchOtherInfo(artistID, cb1);
                    else cb1(filteredData);
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
