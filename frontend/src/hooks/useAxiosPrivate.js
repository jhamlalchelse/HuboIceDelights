import React, { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';
import { axiosPrivate } from '../api/axios';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config=>{
        if(!config.headers['Authorization']){
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        } return config
      },
      (error)=> Promise.eject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error)=>{
        const prevRequest = error?.config;
        if(error?.response?.status === 403 && !prevRequest?.send){
            prevRequest.send = true
            const newAccessToken = await refresh()
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return axiosPrivate(prevRequest)
          }
          return Promise.eject(error)
          }
    );

    return ()=>{
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
