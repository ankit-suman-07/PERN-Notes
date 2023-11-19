import React from 'react';
import "./Navbar.css";

const Navbar = ({ userSignOut, userName }) => {
    return (
        <div className='navbar-div' >
            <div className='logo' >
                NOTES.
            </div>
            <div className='user-div' >
                <div className='user-text' >
                    Welcome, <span>{userName.split(" ")[0]}</span>
                </div>
                <button onClick={userSignOut} >
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default Navbar