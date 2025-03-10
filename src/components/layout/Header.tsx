import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSubscription } from '../../context/SubscriptionContext';
import ThemeSwitch from './ThemeSwitch';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, login, logout } = useAuth();
  const { hasActiveSubscription } = useSubscription();
  
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="container px-8 py-5 mx-auto xl:px-5 max-w-screen-lg">
      <div className="absolute right-8 top-5 theme-switch-container">
        <ThemeSwitch />
      </div>
      <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
        <Link to="/" className="text-3xl font-bold font-serif">
          Matter St.
        </Link>
        <div
          className="hidden md:flex md:flex-row md:justify-end md:w-auto md:flex-1 items-center gap-10">
          {menuItems.map((item) => (
            <Link 
              key={item.label}
              to={item.href} 
              className="relative text-sm font-medium hover:text-gray-800 dark:hover:text-gray-300 nav-link"
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {!hasActiveSubscription && (
                <Link
                  to="/subscribe"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
                >
                  Go Premium
                </Link>
              )}
              <Link
                to="/profile"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
              >
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full mr-2"
                  />
                )}
                {user?.name}
              </Link>
              <button
                onClick={() => logout()}
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={() => login()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Log in
            </button>
          )}
        </div>

        <button
          aria-label="Toggle Menu"
          className="px-2 py-1 ml-auto rounded-md md:hidden focus:text-blue-500 dark:focus:text-purple-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {!menuOpen ? (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            )}
          </svg>
        </button>
      </div>
      
      {menuOpen && (
        <div className="flex flex-col items-center justify-start w-full md:hidden mt-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="px-5 py-2 text-sm font-medium hover:text-blue-500 dark:hover:text-purple-500"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="px-5 py-2 text-sm font-medium hover:text-blue-500 dark:hover:text-purple-500"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="px-5 py-2 text-sm font-medium hover:text-blue-500 dark:hover:text-purple-500"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                login();
                setMenuOpen(false);
              }}
              className="px-5 py-2 text-sm font-medium hover:text-blue-500 dark:hover:text-purple-500"
            >
              Log in
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;