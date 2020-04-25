import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import MainContextProvider from './context/MainContext';

function App() {
    return (
        <Router>
            <Switch>
                <MainContextProvider>
                    <Route path='/auth'>
                        <Auth />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </MainContextProvider>
            </Switch>
        </Router>
    );
}

export default App;
