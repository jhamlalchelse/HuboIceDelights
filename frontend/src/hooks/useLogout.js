import React from 'react';
import useAuth from './useAuth';
import axios from '../api/axios';

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    await axios.get('logout', {
      withCredentials: true,
    });
    try {
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
