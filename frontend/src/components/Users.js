import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Users = ({ setLoading, users }) => {
  
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
