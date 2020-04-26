export default (state, action) => {
    switch (action.type) {
        case 'SAVE_TOKEN':
            localStorage.setItem('token', action.payload);
            return state;
        case 'PLAY_TRACK':
            return { ...state, currTrack: action.payload };
        case 'UPDATE_TRACKS':
            return { ...state, searchedTracks: action.payload };
        case 'UPDATE_ARTISTS':
            return {
                ...state,
                searchedArtist: action.payload.artist,
                similarArtists: action.payload.similar,
            };
        default:
            return state;
    }
};
