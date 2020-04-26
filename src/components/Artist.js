import React from 'react';
import './styles/Artist.css';

const Artist = ({ data: { name, images, genres }, onClick }) => {
    const genre = genres.reduce((acc, curr) => (curr > acc ? curr : acc));
    return (
        <div className='artist-wrapper' onClick={() => onClick(name)}>
            <img alt='artist portrait' src={images[0].url} />
            <h3>{name}</h3>
            <p>{genre}</p>
        </div>
    );
};
export default Artist;
