import React from "react";

const navbar = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100">
      <nav className="backdrop-blur-sm bg-white/80 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              CodeTime
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 text-indigo-600 hover:text-purple-600 rounded-lg transition-all duration-200 ease-in-out hover:bg-white/50 md:hover:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block py-2 px-3 text-indigo-600 hover:text-purple-600 rounded-lg transition-all duration-200 ease-in-out hover:bg-white/50 md:hover:bg-transparent md:p-0"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="block py-2 px-3 text-indigo-600 hover:text-purple-600 rounded-lg transition-all duration-200 ease-in-out hover:bg-white/50 md:hover:bg-transparent md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default navbar;
