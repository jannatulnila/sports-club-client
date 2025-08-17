// import { AiOutlineMenu } from 'react-icons/ai';
// import { useState } from 'react';
// import { Link, NavLink } from 'react-router';
// import avatarImg from '../assets/placeholder.jpg';
// import useAuth from '../Hooks/useAuth';
// import PrimeFit from './PrimeFit';

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="sticky top-0 z-50 bg-white text-primary shadow-md">
//       <div className="py-2 border-b-[1px] px-4 md:px-6 lg:px-8">
//         <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
//           {/* Logo */}
//           <p>
//             <PrimeFit />
//           </p>

//           {/* Desktop Nav Links */}
//           <div className="hidden md:flex gap-6 font-semibold text-primary">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `transition px-2 py-1 rounded ${
//                   isActive ? 'bg-gray-200' : 'hover:bg-neutral-100'
//                 }`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/courts"
//               className={({ isActive }) =>
//                 `transition px-2 py-1 rounded ${
//                   isActive ? 'bg-gray-200' : 'hover:bg-neutral-100'
//                 }`
//               }
//             >
//               Courts
//             </NavLink>
//           </div>

//           {/* Dropdown Menu (Mobile + Profile) */}
//           <div className="relative">
//             <div className="flex flex-row items-center gap-3">
//               <div
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
//               >
//                 <AiOutlineMenu />
//                 <div className="hidden md:block">
//                   <img
//                     className="rounded-full"
//                     referrerPolicy="no-referrer"
//                     src={user?.photoURL || avatarImg}
//                     alt="profile"
//                     height="30"
//                     width="30"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Dropdown Panel */}
//             {isOpen && (
//               <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[14rem] bg-white overflow-hidden right-0 top-12 text-sm z-50">
//                 <div className="flex flex-col cursor-pointer">
//                   {/* Mobile Links Only */}
//                   <NavLink
//                     to="/"
//                     onClick={() => setIsOpen(false)}
//                     className={({ isActive }) =>
//                       `block md:hidden px-4 py-3 transition font-semibold ${
//                         isActive ? 'bg-gray-200 text-primary' : 'hover:bg-neutral-100 text-primary'
//                       }`
//                     }
//                   >
//                     Home
//                   </NavLink>
//                   <NavLink
//                     to="/courts"
//                     onClick={() => setIsOpen(false)}
//                     className={({ isActive }) =>
//                       `block md:hidden px-4 py-3 transition font-semibold ${
//                         isActive ? 'bg-gray-200 text-primary' : 'hover:bg-neutral-100 text-primary'
//                       }`
//                     }
//                   >
//                     Courts
//                   </NavLink>

//                   {user ? (
//                     <>
//                       <span className="px-4 py-2 text-gray-500 text-sm">{user?.displayName}</span>

//                       <NavLink
//                         to="/dashboard"
//                         onClick={() => setIsOpen(false)}
//                         className={({ isActive }) =>
//                           `px-4 py-3 transition font-semibold ${
//                             isActive
//                               ? 'bg-gray-200 text-primary'
//                               : 'hover:bg-neutral-100 text-primary'
//                           }`
//                         }
//                       >
//                         Dashboard
//                       </NavLink>

//                       <div
//                         onClick={() => {
//                           logOut();
//                           setIsOpen(false);
//                         }}
//                         className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-red-500 cursor-pointer"
//                       >
//                         Logout
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <NavLink
//                         to="/login"
//                         onClick={() => setIsOpen(false)}
//                         className={({ isActive }) =>
//                           `px-4 py-3 transition font-semibold ${
//                             isActive
//                               ? 'bg-gray-200 text-primary'
//                               : 'hover:bg-neutral-100 text-primary'
//                           }`
//                         }
//                       >
//                         Login
//                       </NavLink>
//                       <NavLink
//                         to="/register"
//                         onClick={() => setIsOpen(false)}
//                         className={({ isActive }) =>
//                           `px-4 py-3 transition font-semibold ${
//                             isActive
//                               ? 'bg-gray-200 text-primary'
//                               : 'hover:bg-neutral-100 text-primary'
//                           }`
//                         }
//                       >
//                         Register
//                       </NavLink>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


// import { AiOutlineMenu } from 'react-icons/ai';
// import { useState } from 'react';
// import { Link, NavLink } from 'react-router';
// import avatarImg from '../assets/placeholder.jpg';
// import useAuth from '../Hooks/useAuth';
// import PrimeFit from './PrimeFit';
// import useUserRole from '../Hooks/useUserRole';

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const { role, roleLoading } = useUserRole();

//   return (
//     <div className="sticky top-0 z-50 bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between">
        
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <PrimeFit />
//         </Link>

//         {/* Desktop Nav Links */}
//         <div className="hidden md:flex gap-6 font-medium text-gray-700">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `transition hover:text-primary ${
//                 isActive ? 'text-primary font-semibold' : ''
//               }`
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/courts"
//             className={({ isActive }) =>
//               `transition hover:text-primary ${
//                 isActive ? 'text-primary font-semibold' : ''
//               }`
//             }
//           >
//             Courts
//           </NavLink>
//           {role === 'user' && (
//              <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `transition hover:text-primary ${
//                 isActive ? 'text-primary font-semibold' : ''
//               }`
//             }
//           >
//             Dashboard
//           </NavLink>
//           )}
          
//           {role === 'member' && (
//              <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `transition hover:text-primary ${
//                 isActive ? 'text-primary font-semibold' : ''
//               }`
//             }
//           >
//             Member Dashboard
//           </NavLink>
//           )}
//           {!roleLoading && role === 'admin' &&(
//             <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `transition hover:text-primary ${
//                 isActive ? 'text-primary font-semibold' : ''
//               }`
//             }
//           >
//             Admin
//           </NavLink>
//           )}
//         </div>

//         {/* Right Side */}
//         <div className="hidden md:flex items-center gap-3">
//           {user ? (
//             <>
//               <img
//                 className="w-8 h-8 rounded-full"
//                 src={user?.photoURL || avatarImg}
//                 alt="profile"
//               />
//               <button
//                 onClick={logOut}
//                 className="px-3 py-1 text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-50"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/register"
//                 className="px-4 py-2 text-sm font-medium border border-primary text-primary rounded-md hover:bg-primary/10 transition"
//               >
//                 Join Now
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div
//           className="md:hidden p-2 border rounded-md  text-secondary cursor-pointer"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <AiOutlineMenu size={22} />
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3">
//           <NavLink to="/" onClick={() => setIsOpen(false)} className="block text-secondary">
//             Home
//           </NavLink>
//           <NavLink to="/courts" onClick={() => setIsOpen(false)} className="block text-secondary">
//             Courts
//           </NavLink>
//           {role === 'user' && (
//              <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `transition hover:text-primary text-secondary ${
//                 isActive ? 'text-primary font-semibold' : ''
//               }`
//             }
//           >
//             Dashboard
//           </NavLink>
//           )}
          
//           {role === 'member' && (
//              <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `transition text-secondary hover:text-primary ${
//                 isActive ? 'text-primary font-semibold' : ''
//               }`
//             }
//           >
//             Member Dashboard
//           </NavLink>
//           )}
//           {!roleLoading && role === 'admin' &&(
//             <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `transition text-secondary hover:text-primary ${
//                 isActive ? 'text-primary font-semibold' : ''
//               }`
//             }
//           >
//             Admin
//           </NavLink>
//           )}

//           {user ? (
//             <button
//               onClick={() => {
//                 logOut();
//                 setIsOpen(false);
//               }}
//               className="w-full text-left text-red-500"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <Link to="/login" onClick={() => setIsOpen(false)} className="block text-secondary">
//                 Sign In
//               </Link>
//               <Link to="/register" onClick={() => setIsOpen(false)} className="block text-secondary">
//                 Join Now
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

// import { AiOutlineMenu } from 'react-icons/ai';
// import { useState } from 'react';
// import { Link, NavLink } from 'react-router';
// import avatarImg from '../assets/placeholder.jpg';
// import useAuth from '../Hooks/useAuth';
// import PrimeFit from './PrimeFit';
// import useUserRole from '../Hooks/useUserRole';

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const { role, roleLoading } = useUserRole();

//   // Common NavLink style
//   const linkStyle = ({ isActive }) =>
//     `transition hover:text-yellow-300 ${
//       isActive ? 'font-semibold text-yellow-300' : ''
//     }`;

//   return (
//     <div className="sticky top-0 z-50 w-full bg-primary text-white dark:bg-gray-900 dark:text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between">
        
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <PrimeFit />
//         </Link>

//         {/* Desktop Nav Links */}
//         <div className="hidden md:flex gap-6 font-medium">
//           {/* Always visible */}
//           <NavLink to="/" className={linkStyle}>Home</NavLink>
//           <NavLink to="/courts" className={linkStyle}>Courts</NavLink>
//           <NavLink to="/about" className={linkStyle}>About</NavLink>

//           {/* Protected Routes */}
//           {user && !roleLoading && (
//             <>
//               {(role === 'member' || role === 'user') && (
//                 <NavLink to="/dashboard" className={linkStyle}>
//                   Dashboard
//                 </NavLink>
//               )}
//               {role === 'admin' && (
//                 <NavLink to="/dashboard" className={linkStyle}>
//                   Admin
//                 </NavLink>
//               )}
//               <NavLink to="/profile" className={linkStyle}>Profile</NavLink>
//             </>
//           )}
//         </div>

//         {/* Right Side */}
//         <div className="hidden md:flex items-center gap-3">
//           {user ? (
//             <>
//               <img
//                 className="w-8 h-8 rounded-full border border-white"
//                 src={user?.photoURL || avatarImg}
//                 alt="profile"
//               />
//               <button
//                 onClick={logOut}
//                 className="px-3 py-1 text-sm rounded-md border border-red-400 text-red-400 hover:bg-red-50/20 transition"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="px-4 py-2 text-sm font-medium bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/register"
//                 className="px-4 py-2 text-sm font-medium border border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition"
//               >
//                 Join Now
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div
//           className="md:hidden p-2 border rounded-md cursor-pointer"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <AiOutlineMenu size={22} />
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-primary text-white dark:bg-gray-900 px-4 py-4 space-y-3">
//           <NavLink to="/" onClick={() => setIsOpen(false)} className="block">
//             Home
//           </NavLink>
//           <NavLink to="/courts" onClick={() => setIsOpen(false)} className="block">
//             Courts
//           </NavLink>
//           <NavLink to="/about" onClick={() => setIsOpen(false)} className="block">
//             About
//           </NavLink>

//           {user && !roleLoading && (
//             <>
//               {(role === 'member' || role === 'user') && (
//                 <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="block">
//                   Dashboard
//                 </NavLink>
//               )}
//               {role === 'admin' && (
//                 <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="block">
//                   Admin
//                 </NavLink>
//               )}
//               <NavLink to="/profile" onClick={() => setIsOpen(false)} className="block">
//                 Profile
//               </NavLink>
//             </>
//           )}

//           {user ? (
//             <button
//               onClick={() => {
//                 logOut();
//                 setIsOpen(false);
//               }}
//               className="w-full text-left text-red-400"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <Link to="/login" onClick={() => setIsOpen(false)} className="block">
//                 Sign In
//               </Link>
//               <Link to="/register" onClick={() => setIsOpen(false)} className="block">
//                 Join Now
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;


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
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between">
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
