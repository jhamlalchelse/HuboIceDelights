import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Users from "../components/Users";
import Loader from "../components/Loader";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getUsers = async () => {
    try {
      const { data } = await axiosPrivate.get("users");
      const usernames = data?.map((item) => item.username);
      setUsers(usernames);
      console.log("users:", usernames);
    } catch (error) {
      console.error(error);
      navigate("/login", { state: { from: location }, replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader show={true} />
      ) : (
        <section>
          <h1 className="text-3xl text-center mt-5">Admin Page</h1>
          <Users setLoading={setLoading} users={users} />
          <Link to={"/"} className="flex justify-center mt-5">
            <span className="bg-blue-500 py-1 px-10"> Home</span>
          </Link>
        </section>
      )}
    </div>
  );
};

export default Admin;
