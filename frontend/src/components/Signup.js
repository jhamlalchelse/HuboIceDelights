import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{3,25}$/;
const PWD_REGEX =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;

const Signup = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState('jhamlal');
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('Abcd#123');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('Abcd#123');
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidUser(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatchPwd(match);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, password, matchPwd]);

  const submitHandle = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg('Invalid Username and Password');
      return;
    }
    try {
      const { data } = await axios.post(
        'register/',
        {
          username: user,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(data.user);
      setSuccess(true);
    } catch (error) {
      if (!error.response) {
        setErrMsg('No server response');
      } else if (error.response?.status === 409) {
        setErrMsg('Username Already Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errorRef.current.focus();
      // console.error(error);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {success ? (
            <section>
              <p className="text-center mt-2 text-green-700 text-3xl font-serif">
                Success
              </p>
              <Link
                className="text-blue-500 hover:underline flex justify-center my-5"
                to={'/login'}
              >
                Go To The Login Page
              </Link>
            </section>
          ) : (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p
                ref={errorRef}
                className={`${errMsg ? 'text-rose-500' : 'hidden'}`}
              >
                {errMsg}
              </p>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
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
                    placeholder="username"
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500"
                  />
                  <p
                    className={`bg-rose-200 mt-1.5 rounded-md p-2 ${
                      user && userFocus && !validUser
                        ? 'text-rose-500'
                        : 'hidden'
                    }`}
                  >
                    4 to 24 character allowed
                  </p>
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
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <p
                    className={`bg-rose-200 mt-1.5 rounded-md p-2 
                    ${pwdFocus && !validPwd ? 'text-rose-500' : 'hidden'}`}
                  >
                    8 to 24 character allowed with start capitall letter and
                    minimum one special character except '@'
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="confirm_pwd"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_pwd"
                    id="confirm_pwd"
                    placeholder="••••••••"
                    required
                    onFocus={() => setMatchPwdFocus(true)}
                    onBlur={() => setMatchPwdFocus(false)}
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <p
                    className={`bg-rose-200 mt-1.5 rounded-md p-2 ${
                      matchPwdFocus && !validMatchPwd
                        ? 'text-rose-500'
                        : 'hidden'
                    }`}
                  >
                    password not match
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={
                    !validUser || !validPwd || !validMatchPwd ? true : false
                  }
                  className="w-full text-white bg-blue-600 
                  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do have an account yet ?{' '}
                  <Link
                    to={'/login'}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signup;
