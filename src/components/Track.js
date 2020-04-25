import React from 'react';
import './styles/Track.css';

const Track = ({ data: { name, album } }) => {
    return (
        <div className='track-wrapper'>
            <img alt='cover art' src={album.images[0].url} />
            <h1>{name}</h1>
            <p>{album.name}</p>
        </div>
    );
};
export default Track;
