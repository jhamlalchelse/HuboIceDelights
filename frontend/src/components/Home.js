import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Home = () => {
  const logout = useLogout();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-slate-300 p-5 rounded-md">
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
          <li className="hover:underline text-blue-800 my-1 px-5 bg-blue-200">
            <Link to={'/linkage'}>Linkage</Link>
          </li>
        </ul>
        <button
          onClick={() => logout()}
          className="bg-teal-500 px-5 py-1 mt-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
