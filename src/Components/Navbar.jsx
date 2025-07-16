import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import avatarImg from '../assets/placeholder.jpg';
import useAuth from '../Hooks/useAuth';
import PrimeFit from './PrimeFit';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white text-primary shadow-md">
      <div className="py-4 border-b-[1px] px-4 md:px-8 lg:px-16">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          {/* Logo */}
          <button className="btn btn-ghost hover:bg-white border-none text-xl">
            <PrimeFit />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-6 font-semibold text-primary">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition px-2 py-1 rounded ${
                  isActive ? 'bg-gray-200' : 'hover:bg-neutral-100'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/courts"
              className={({ isActive }) =>
                `transition px-2 py-1 rounded ${
                  isActive ? 'bg-gray-200' : 'hover:bg-neutral-100'
                }`
              }
            >
              Courts
            </NavLink>
          </div>

          {/* Dropdown Menu (Mobile + Profile) */}
          <div className="relative">
            <div className="flex flex-row items-center gap-3">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu />
                <div className="hidden md:block">
                  <img
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || avatarImg}
                    alt="profile"
                    height="30"
                    width="30"
                  />
                </div>
              </div>
            </div>

            {/* Dropdown Panel */}
            {isOpen && (
              <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[14rem] bg-white overflow-hidden right-0 top-12 text-sm z-50">
                <div className="flex flex-col cursor-pointer">
                  {/* Mobile Links Only */}
                  <NavLink
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block md:hidden px-4 py-3 transition font-semibold ${
                        isActive ? 'bg-gray-200 text-primary' : 'hover:bg-neutral-100 text-primary'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/courts"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block md:hidden px-4 py-3 transition font-semibold ${
                        isActive ? 'bg-gray-200 text-primary' : 'hover:bg-neutral-100 text-primary'
                      }`
                    }
                  >
                    Courts
                  </NavLink>

                  {user ? (
                    <>
                      <span className="px-4 py-2 text-gray-500 text-sm">{user?.displayName}</span>

                      <NavLink
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `px-4 py-3 transition font-semibold ${
                            isActive
                              ? 'bg-gray-200 text-primary'
                              : 'hover:bg-neutral-100 text-primary'
                          }`
                        }
                      >
                        Dashboard
                      </NavLink>

                      <div
                        onClick={() => {
                          logOut();
                          setIsOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-red-500 cursor-pointer"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `px-4 py-3 transition font-semibold ${
                            isActive
                              ? 'bg-gray-200 text-primary'
                              : 'hover:bg-neutral-100 text-primary'
                          }`
                        }
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `px-4 py-3 transition font-semibold ${
                            isActive
                              ? 'bg-gray-200 text-primary'
                              : 'hover:bg-neutral-100 text-primary'
                          }`
                        }
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
