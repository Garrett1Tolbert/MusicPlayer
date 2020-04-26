import React, { useState, useEffect, useContext } from 'react';
import './styles/Auth.css';
import spotify from '../res/spotify.png';
import clientID from '../config';
import { Link } from 'react-router-dom';
import { MainContext } from '../context/MainContext';

const Auth = () => {
    const [animate, setAnimate] = useState(false);
    const { saveToken } = useContext(MainContext);

    const authenticate = () => {
        const scopes = 'user-read-private user-read-email';
        const redirect_uri = 'http://localhost:3000/';
        window.location =
            'https://accounts.spotify.com/authorize' +
            '?response_type=token' +
            '&client_id=' +
            clientID +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' +
            encodeURIComponent(redirect_uri);
    };
    useEffect(() => {
        setAnimate(true);
    }, []);
    return (
        <div className='auth-wrapper'>
            <div className={animate ? 'auth-container show' : 'auth-container'}>
                <h1>BUILT WITH SPOTIFY</h1>
                <div className='cta' onClick={authenticate}>
                    <img alt='spotify logo' src={spotify} />
                    <p>Authenticate</p>
                </div>
                {/* <Link to='/'>
                    <div
                        className='guest-cta'
                        onClick={() => saveToken('guest')}
                    >
                        <p>Guest</p>
                        <i className='material-icons'>arrow_forward</i>
                    </div>
                </Link> */}
            </div>
        </div>
    );
};
export default Auth;
