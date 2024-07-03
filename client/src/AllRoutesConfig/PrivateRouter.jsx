import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HookContext } from '../hook/useHookProvider';

const PrivateRouter = ({ children }) => {
    const { token, saveToken } = useContext(HookContext);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenLocalStorage = localStorage.getItem('token');
        if (tokenLocalStorage) {
            saveToken(tokenLocalStorage);
        } else {
            navigate('/login');
        }
    }, [navigate, saveToken]);

    return token ? children : null;
};

export default PrivateRouter;