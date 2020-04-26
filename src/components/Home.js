import React, { useState, useContext, useEffect } from 'react';
import './styles/Home.css';
import { MainContext } from '../context/MainContext';
import { Redirect } from 'react-router-dom';
import { fetchArtist } from '../spotifyFunctions';
import Track from './Track';
import Artist from './Artist';
import { Howl } from 'howler';

const Home = () => {
    const url = window.location.href;
    const {
        updateTracks,
        updateArtists,
        currTrack,
        searchedArtist,
        similarArtists,
        searchedTracks,
        saveToken,
    } = useContext(MainContext);
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState(false);
    const [currPlayer, setCurrPlayer] = useState(null);

    useEffect(() => {
        if (url.length > 35) {
            saveToken(
                url.substring(
                    url.indexOf('token=') + 6,
                    url.indexOf('token_type=') - 1
                )
            );
        }
    }, [url, saveToken]);
    useEffect(() => {
        if (localStorage.getItem('token')) window.location.hash = '';
    }, [saveToken]);
    useEffect(() => {
        if (currTrack) {
            if (currPlayer !== null) {
                currPlayer.stop();
                currPlayer.unload();
            } else {
                var sound = new Howl({
                    src: [currTrack.preview_url],
                    format: ['mp3'],
                });
                setCurrPlayer(sound);
                sound.play();
            }
            if (currPlayer !== null && currPlayer.state() === 'unloaded') {
                sound = new Howl({
                    src: [currTrack.preview_url],
                    format: ['mp3'],
                });
                setCurrPlayer(sound);
                sound.play();
            }
        }
    }, [currTrack]);

    const handleSearchClick = async () => {
        if (searchQuery) {
            setSearchQuery(false);
            return;
        }
        if (query !== '') {
            setSearchQuery(true);
            await fetchArtist(query, updateTracks, updateArtists);
        }
    };
    return !localStorage.getItem('token') ? (
        <Redirect to='/auth' />
    ) : (
        <div className='home-wrapper'>
            <div className='home-container'>
                <div className='search-results'>
                    {searchedTracks.map((item, idx) => (
                        <Track key={idx} data={item} />
                    ))}
                </div>
                {similarArtists.length === 0 ? null : (
                    <div className='similar-artists'>
                        <h1>Similar to {searchedArtist}</h1>
                        <div className='artists'>
                            {similarArtists.map((item, idx) => (
                                <Artist key={idx} data={item} />
                            ))}
                        </div>
                    </div>
                )}

                <div
                    className={
                        searchQuery ? 'query-wrapper hide' : 'query-wrapper'
                    }
                    onClick={handleSearchClick}
                >
                    <div className='query-container'>
                        <input
                            value={query}
                            placeholder='Search for an Artist...'
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <i
                            onClick={handleSearchClick}
                            className='material-icons'
                        >
                            search
                        </i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
