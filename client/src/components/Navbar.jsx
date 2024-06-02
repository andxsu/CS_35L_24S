import React from 'react';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import {UserContext} from '../../context/userContext';


export default function Navbar(){
    const {user, logout} = useContext(UserContext)
    return (
        <nav>
            <Link to='/'>Home</Link>
            {!user ? (
                <>
                    <Link to='/login'>Login</Link>
                </>
            ) : (
                <button onClick={logout}>Logout</button>
            )}
        </nav>
    );
}
