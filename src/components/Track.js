import React, { useContext } from 'react';
import './styles/Track.css';
import { MainContext } from '../context/MainContext';

const Track = ({ data }) => {
    const { name, album } = data;
    const { playTrack } = useContext(MainContext);

    return (
        <div className='track-wrapper' onClick={() => playTrack(data)}>
            <img alt='cover art' src={album.images[0].url} />
            <h1>{name}</h1>
            <p>{album.name}</p>
        </div>
    );
};
export default Track;
