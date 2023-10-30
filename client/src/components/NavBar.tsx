import React,{ FC } from 'react'
import './NavBar.scss';

const NavBar: FC = () => {
    return (
        <div className="navbar-container">
            <h3>Fancy CV Maker</h3>
            <h4>Login/Register</h4>
        </div>
    );
};

export default NavBar;