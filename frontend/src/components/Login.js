import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { auth, setAuth, persist, setPersist } = useAuth();
  const errorRef = useRef();
  const userRef = useRef();
  const [user, setUser] = useState('jhamlal');
  const [password, setPassword] = useState('Abcd#123');
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, password]);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  const submitHandle = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        'auth/',
        {
          username: user,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const { roles, accessToken } = data;
      setAuth({ user, accessToken, roles });
      console.log('data::', data);
      navigate(from, { replace: true });
    } catch (error) {
      if (!error.response) {
        setErrMsg('No server response');
      } else if (error.response?.status === 400) {
        setErrMsg('Missing username or password');
      } else if (error.response?.status === 401) {
        setErrMsg('Unauthorize');
      } else {
        setErrMsg('Login Failed');
      }
      errorRef.current.focus();
      // console.error(error);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p
              ref={errorRef}
              className={`${errMsg ? 'text-rose-500' : 'hidden'}`}
            >
              {errMsg}
            </p>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandle}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  ref={userRef}
                  type="text"
                  name="username"
                  id="username"
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500"
                  placeholder="username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      checked={persist}
                      onChange={togglePersist}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to={'/forgate'}
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet ?{' '}
                <Link
                  to={'/signup'}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
