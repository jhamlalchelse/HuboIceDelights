import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Linkage = () => {
  const { auth } = useAuth();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-slate-300 p-5 rounded-md">
        <p className="text-3xl">Public Route</p>
        <ul>
          {!auth?.user && (
            <li className="hover:underline text-blue-800 my-1 px-5 bg-blue-200">
              <Link to={'/login'}>Login</Link>
            </li>
          )}
          <li className="hover:underline text-blue-800 my-1 px-5 bg-blue-200">
            <Link to={'/signup'}>Signup</Link>
          </li>
        </ul>
        <p className="text-3xl">Private Route</p>
        <ul>
          <li className="hover:underline text-blue-800 my-1 px-5 bg-blue-200">
            <Link to={'/admin'}>Admin</Link>
          </li>
          <li className="hover:underline text-blue-800 my-1 px-5 bg-blue-200">
            <Link to={'/editor'}>Editor</Link>
          </li>
          <li className="hover:underline text-blue-800 my-1 px-5 bg-blue-200">
            <Link to={'/lounge'}>Lounge</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Linkage;
