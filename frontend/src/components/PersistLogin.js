import React, { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refrsh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refrsh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return !persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
