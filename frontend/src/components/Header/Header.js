import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { headers } from "./constants";
import useAuth from "../../hooks/useAuth";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = ({ handleThemeSwitch, theme }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const { pathname } = location;
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = useLogout();

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex shadow-md py-1 px-4 sm:px-10 bg-teal-600 font-sans tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between w-full">
        <Link to="/">
          <img src="assets/images/logo.svg" alt="logo" className="h-12" />
        </Link>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 
          max-lg:before:inset-0 max-lg:before:z-50 `}
        >
          <button
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <Link to="/" className="md:hidden">
              <img src="assets/images/logo.svg" alt="logo" className="h-12" />
            </Link>

            {headers.map((item, index) => {
              return (
                <li
                  key={index}
                  className="md:text-white max-lg:border-b border-gray-300 max-lg:py-3 px-3"
                >
                  <Link
                    to={item.url}
                    style={{ textShadow: "1px 1px 2px #1e40af" }}
                    className={`text-[16.5px] ${
                      isActive(item.url) ? "text-pink-500" : null
                    } hover:text-pink-500`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex max-lg:ml-auto space-x-5">
          {theme === "light" ? (
            <button onClick={handleThemeSwitch}>
              <MdDarkMode size={25} className="text-slate-900" />
            </button>
          ) : (
            <button onClick={handleThemeSwitch}>
              <MdOutlineLightMode size={25} className="text-slate-200" />
            </button>
          )}

          {auth?.user ? (
            <div className="flex items-center space-x-4 text-white">
              <p
                className="border font-serif
                px-3 py-1 rounded shadow-md hidden lg:block ms-3"
              >
                Hi {auth.user}
              </p>
              <button
                onClick={() => logout()}
                className="bg-pink-600 px-3 py-1 rounded-sm font-medium font-serif 
                  shadow-md active:translate-y-0.5 active:shadow-none"
              >
                Signout
              </button>
            </div>
          ) : (
            <Link
              className="text-white bg-sky-600 font-medium font-serif px-3 py-1 rounded 
                shadow-md shadow-sky-500 active:translate-y-0.5 active:shadow-none"
              to="/signin"
            >
              Sign In
            </Link>
          )}

          <button className="lg:hidden" onClick={handleClick}>
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
