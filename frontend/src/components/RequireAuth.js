import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = ({ allowRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const roles = decoded?.UserInfo?.roles || [];

  return roles.find((role) => allowRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to={'/unauthorize'} state={{ from: location }} replace />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};

export default RequireAuth;
