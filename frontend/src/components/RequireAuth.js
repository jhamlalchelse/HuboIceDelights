import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = ({ allowRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to={'/unauthorize'} state={{ from: location }} replace />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};

export default RequireAuth;
