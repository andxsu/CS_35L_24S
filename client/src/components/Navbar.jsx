import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function Navbar() {
    const { user, logout } = useContext(UserContext);
    
    const navStyle = {
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        gap: '30px',
        fontSize: '25px',
        marginBottom: '15px'
    };

    const linkStyle = {
        textDecoration: 'none',
        padding: '8px 16px',
    };

    return (
        <nav style={navStyle}>
        <Link to='/' style={linkStyle}>Home</Link>
        {!user ? (
            <>
                <Link to='/login' style={linkStyle}>Login</Link>
            </>
        ) : (
            <>
                
                {user.user_type === 'Deliverer' && (
                    <Link to='/deliverydashboard' style={linkStyle}>Delivery Dashboard</Link>
                )}
                {user.user_type === 'Customer' && (
                    <Link to='/dashboard' style={linkStyle}>Dashboard</Link>
                )}
                <Link to='/update' style={linkStyle}>My Account</Link>
                <button onClick={logout} style={linkStyle}>Logout</button>
            </>
            )}
        </nav>
    );
}
