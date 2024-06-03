import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const { data } = await axios.get('/profile');
        setUser(data);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const logout = async () => {
        await axios.post('/logout');
        setUser(null);
        navigate('/login')
        
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
}
