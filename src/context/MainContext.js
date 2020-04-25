import React, { createContext, useReducer } from 'react';
import AppReducer from './appReducer';

const initialState = {
    token: localStorage.getItem('') || '',
    searchedTracks: [],
    searchedArtist: '',
    similarArtists: [],
};

export const MainContext = createContext(initialState);

const MainContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const saveToken = (token) => {
        dispatch({
            type: 'SAVE_TOKEN',
            payload: token,
        });
    };
    const updateTracks = (tracks) => {
        dispatch({
            type: 'UPDATE_TRACKS',
            payload: tracks.slice(0, 4),
        });
    };
    const updateArtists = (artist, artists) => {
        dispatch({
            type: 'UPDATE_ARTISTS',
            payload: { artist, similar: artists.slice(0, 3) },
        });
    };
    return (
        <MainContext.Provider
            value={{
                token: state.token,
                searchedTracks: state.searchedTracks,
                searchedArtist: state.searchedArtist,
                similarArtists: state.similarArtists,
                saveToken,
                updateTracks,
                updateArtists,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};
export default MainContextProvider;
