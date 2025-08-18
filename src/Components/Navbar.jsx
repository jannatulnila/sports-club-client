import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router"; 
import avatarImg from "../assets/placeholder.jpg";
import useAuth from "../Hooks/useAuth";
import PrimeFit from "./PrimeFit";
import useUserRole from "../Hooks/useUserRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  // NavLink active style
  const linkStyle = ({ isActive }) =>
    `transition hover:text-yellow-300 ${
      isActive ? "font-semibold text-yellow-300" : ""
    }`;

  // Decide profile path based on role
  const profilePath =
    role === "admin"
      ? "/adminProfile"
      : role === "member"
      ? "/memberProfile"
      : role === "user"
      ? "/userProfile"
      : null;

  return (
    <div className="sticky top-0 z-50 bg-primary text-white dark:bg-gray-900 dark:text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <PrimeFit />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 font-medium">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/courts" className={linkStyle}>
            Courts
          </NavLink>
          <NavLink to="/about" className={linkStyle}>
            About
          </NavLink>

          {/* Only show when logged in */}
          {!roleLoading && user && (
            <>
              {profilePath && (
                <NavLink to={profilePath} className={linkStyle}>
                  Profile
                </NavLink>
              )}
              <NavLink to="/dashboard" className={linkStyle}>
                {role === "admin"
                  ? "Admin Dashboard"
                  : role === "member"
                  ? "Member Dashboard"
                  : "Dashboard"}
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <img
                className="w-8 h-8 rounded-full border border-white"
                src={user?.photoURL || avatarImg}
                alt="profile"
              />
              <button
                onClick={logOut}
                className="px-3 py-1 text-sm rounded-md border border-red-400 text-red-400 hover:bg-red-50/20 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium border border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition"
              >
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden p-2 border rounded-md cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiOutlineMenu size={22} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-primary text-white dark:bg-gray-900 px-4 py-4 space-y-3">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="block">
            Home
          </NavLink>
          <NavLink to="/courts" onClick={() => setIsOpen(false)} className="block">
            Courts
          </NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className="block">
            About
          </NavLink>

          {!roleLoading && user && (
            <>
              {profilePath && (
                <NavLink
                  to={profilePath}
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  Profile
                </NavLink>
              )}
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                {role === "admin"
                  ? "Admin Dashboard"
                  : role === "member"
                  ? "Member Dashboard"
                  : "Dashboard"}
              </NavLink>
            </>
          )}

          {user ? (
            <button
              onClick={() => {
                logOut();
                setIsOpen(false);
              }}
              className="w-full text-left text-red-400"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block"
              >
                Join Now
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
