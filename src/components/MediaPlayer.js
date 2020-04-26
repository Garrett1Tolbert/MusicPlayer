import React, { useState, useContext, useEffect } from 'react';
import './styles/MediaPlayer.css';
import { MainContext } from '../context/MainContext';

const MediaPlayer = ({ currPlayer }) => {
    const [isPaused, setIsPaused] = useState(false);
    const {
        currTrack: { name, album },
    } = useContext(MainContext);

    useEffect(() => {
        setIsPaused(false);
    }, [name]);
    const togglePlayback = () => {
        if (isPaused) {
            currPlayer.play();
            setIsPaused(false);
        } else {
            currPlayer.pause();
            setIsPaused(true);
        }
    };
    return (
        <div className='mp-wrapper'>
            <div className='mp-container'>
                <img alt='cover art' src={album.images[0].url} />
                <div className='mp-si'>
                    <h2>{name}</h2>
                    <p>{album.name}</p>
                </div>
                <i className='material-icons' onClick={togglePlayback}>
                    {isPaused ? 'play_circle_filled' : 'pause_circle_filled'}
                </i>
            </div>
        </div>
    );
};
export default MediaPlayer;
