import React from 'react';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import {UserContext} from '../../context/userContext';


export default function Navbar(){
    const {user, logout} = useContext(UserContext)
    const navStyle = {
        // position: 'fixed',  // Make navbar fixed at the top
        // top: 0,             // Position it at the top
        // width: '50%',      // Make it span the full width of the page
        zIndex: 1000,       // Ensure it stays above other content
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        gap: '30px',        // Increase the horizontal spacing between links
        fontSize: '30px',   // Increase the font size
    };

    const linkStyle = {
        textDecoration: 'none',
        padding: '8px 16px',
    };

    return (
        <nav style={navStyle}>
            <Link to='/' style={linkStyle}>Home</Link>
            {!user ? (
                <Link to='/login' style={linkStyle}>Login</Link>
            ) : (
                <button onClick={logout} style={linkStyle}>Logout</button>
            )}
        </nav>
    );
}
