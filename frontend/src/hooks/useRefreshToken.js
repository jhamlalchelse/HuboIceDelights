import React from 'react';
import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const { data } = await axios.get('refresh', {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, roles: data.roles, accessToken: data.accessToken };
    });
    return data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
