
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function Login() {
    const navigate = useNavigate();
    const { user, fetchUserData } = useContext(UserContext);
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();

        const { email, password } = data;
        try {
            const { data } = await axios.post('/login', {
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error);
            } else {

                await fetchUserData();
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const labelStyle = {
        fontSize: '20px',
        marginBottom: '10px',
        display: 'block'
    };

    const inputStyle = {
        fontSize: '18px',
        padding: '10px',
        width: '100%',
        marginBottom: '20px',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        fontSize: '18px',
        padding: '10px 20px',
        cursor: 'pointer'
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <form onSubmit={loginUser}>
                <label style={labelStyle}>Email</label>
                <input
                    type='text'
                    placeholder='Enter email...'
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    style={inputStyle}
                />
                <label style={labelStyle}>Password</label>
                <input
                    type='password'
                    placeholder='Enter password...'
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    style={inputStyle}
                />
                <button type='submit' style={buttonStyle}>Log In</button>
                <div style={{ marginTop: '20px' }}>
                    <Link to='/register' style={{ fontSize: '18px' }}>Don't have an account? Register here</Link>
                </div>
            </form>
        </div>
    );
}
