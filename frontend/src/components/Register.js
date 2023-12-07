import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{3,25}$/;
const PWD_REGEX =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;

const Register = () => {
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
    <div>
      {success ? (
        <section>
          <p className="text-center mt-2">
            Success
            <Link className="text-blue-500 ms-1" to={'/login'}>
              Login
            </Link>
          </p>
        </section>
      ) : (
        <section className="h-screen flex justify-center items-center bg-slate-600">
          <div className="bg-slate-300 p-7 rounded-md">
            <p
              ref={errorRef}
              aria-live="assertive"
              className={`mb-3 ${errMsg ? 'text-rose-500' : 'text-slate-500'}`}
            >
              {errMsg}
            </p>
            <p className="text-3xl font-semibold font-serif">Register</p>
            <form onSubmit={submitHandle}>
              <div className="grid grid-cols-2 mt-7">
                <label htmlFor="username">Username</label>
                <input
                  ref={userRef}
                  type="text"
                  id="username"
                  placeholder="username"
                  required
                  autoComplete="off"
                  className="border border-slate-500 px-1 rounded"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <p
                className={`bg-rose-200 mt-1.5 rounded-md p-2 ${
                  user && userFocus && !validUser ? 'text-rose-500' : 'hidden'
                }`}
              >
                4 to 24 character
                <br /> must begain with letter <br /> letter number underline
                hyper allowed
              </p>
              <div className="grid grid-cols-2 mt-10">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-slate-500 px-1 rounded"
                />
              </div>
              <p
                className={`bg-rose-200 mt-1.5 rounded-md p-2 ${
                  pwdFocus && !validPwd ? 'text-rose-500' : 'hidden'
                }`}
              >
                8 to 24 character allowed with start capitall letter and minimum
                one special character except '@'
              </p>
              <div className="grid grid-cols-2 mt-10">
                <label htmlFor="confirm_pwd">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_pwd"
                  required
                  placeholder="••••••••"
                  onFocus={() => setMatchPwdFocus(true)}
                  onBlur={() => setMatchPwdFocus(false)}
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  className="border border-slate-500 px-1 rounded"
                />
              </div>
              <p
                className={`bg-rose-200 mt-1.5 rounded-md p-2 ${
                  matchPwdFocus && !validMatchPwd ? 'text-rose-500' : 'hidden'
                }`}
              >
                not match
              </p>
              <button
                type="submit"
                disabled={
                  !validUser || !validPwd || !validMatchPwd ? true : false
                }
                className="mt-10 disabled:bg-blue-300 bg-blue-500 w-full rounded py-1 text-slate-300"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-2">
              If Already Register Then{' '}
              <Link className="text-blue-500" to={'/login'}>
                Login
              </Link>
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Register;
