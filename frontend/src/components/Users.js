import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axiosPrivate.get('users');
        const usernames = data?.map((item) => item.username);
        setUsers(usernames);
        console.log('users:', usernames);
      } catch (error) {
        console.error(error);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    getUsers();
  }, []);

  return (
    <article className="flex justify-center items-center">
      <div className="bg-slate-300 rounded p-5">
        <p className="text-2xl text-rose-700">Users List</p>
        {users?.length ? (
          <ul>
            {users.map((user, index) => {
              return <li key={index}>{user}</li>;
            })}
          </ul>
        ) : (
          <p className="text-md mt-2">Not Users Found</p>
        )}
      </div>
    </article>
  );
};

export default Users;
