import React from 'react';
import './Header.css';
import logo from '../logo.svg';

class Header extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <span>React Fundamentals</span>
            </header>
        );
    }
}

export default Header;