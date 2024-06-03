import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const fetchUserData = async () => {
        const { data } = await axios.get('/profile');
        setUser(data);
    };

    useEffect(() => {
        if (!user) {
            fetchUserData();
        }
    }, [user]);

    const logout = async () => {
        await axios.post('/logout');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
}
