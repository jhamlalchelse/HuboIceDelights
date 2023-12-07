import React from 'react';
import { Link } from 'react-router-dom';
import Users from './Users';

const Admin = () => {
  return (
    <section>
      <h1 className="text-3xl text-center mt-5">Admin Page</h1>
      <Users />
      <Link to={'/'} className="flex justify-center mt-5">
        <span className="bg-blue-500 py-1 px-10"> Home</span>
      </Link>
    </section>
  );
};

export default Admin;
