import React, { useEffect, useState } from 'react'
import { MyContext } from './MyContext'
import Cookies from 'js-cookie';

const MyContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = Boolean(Cookies.get('accessToken'));

    useEffect(() => {
        if (isAuthenticated) {
            const userDetails = JSON.parse(localStorage.getItem('user'));
            setUser(userDetails);
            setLoading(false);
        } else {
            localStorage.removeItem('user')
            setLoading(false);
        }
    }, []);

    const logout = () => {
        Cookies.remove('accessToken');
        localStorage.removeItem('user')
        window.location.href = '/'
    };

    return (
        <MyContext.Provider value={{
            user,
            logout,
            isAuthenticated,
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyContextProvider