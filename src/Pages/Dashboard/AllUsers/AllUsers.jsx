// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

  
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 500);
//     return () => clearTimeout(timeout);
//   }, [search]);

//   const { data: users = [], isLoading } = useQuery({
//     queryKey: ["all-users", debouncedSearch],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users?search=${debouncedSearch}`);
//       return res.data;
//     },
//     enabled: true, // always enabled
//   });

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl text-secondary text-center font-bold mb-4">All Users</h2>

//       <div className="flex justify-center mb-4">
//         <input
//         type="text"
//         placeholder="Search by name or email..."
//         className="input input-bordered w-full max-w-sm mb-4"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       </div>

//      <div className="bg-black">
//          {isLoading ? (
//         <p className="text-gray-300">Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full table-zebra">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Photo</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Joined</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, i) => (
//                 <tr key={user._id}>
//                   <td>{i + 1}</td>
//                   <td>
//                     <div className="avatar">
//                       <div className="w-12 rounded-full">
//                         <img src={user.image} alt={user.name} />
//                       </div>
//                     </div>
//                   </td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <span className="badge badge-neutral">{user.role || "user"}</span>
//                   </td>
//                   <td>{new Date(user.created_at).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//      </div>
//     </div>
//   );
// };

// export default AllUsers;


import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiEye, FiMail } from "react-icons/fi";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${debouncedSearch}`);
      return res.data;
    },
    enabled: true,
  });

  // Stats
  const totalUsers = users.length;
  const memberCount = users.filter((u) => u.role === "member").length;
  const regularCount = totalUsers - memberCount;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-secondary text-center font-bold mb-6">All Users</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-400 p-4 rounded-lg text-center">
          <div className="text-sm text-blue-500">Total Users</div>
          <div className="text-2xl text-blue-500 font-bold">{totalUsers}</div>
        </div>
        <div className="bg-green-50 border border-green-400 p-4 rounded-lg text-center">
          <div className="text-sm text-green-500">Members</div>
          <div className="text-2xl text-green-500 font-bold">{memberCount}</div>
        </div>
        <div className="bg-gray-50 border border-gray-400 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-500">Regular Users</div>
          <div className="text-2xl text-gray-500 font-bold">{regularCount}</div>
        </div>
      </div>

      {/* Search & Export */}
      <div className=" justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input w-full bg-white border-gray-400 text-black max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {isLoading ? (
          <p className="p-4 text-gray-500">Loading...</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr className="bg-secondary text-gray-700">
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  {/* User info with avatar */}
                  <td className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        {user.image ? (
                          <img src={user.image} alt={user.name} />
                        ) : (
                          <span className="flex items-center justify-center h-full text-gray-500">👤</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-black">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </td>

                  {/* Role badge */}
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "member"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>

                  {/* Joined date */}
                  <td className="text-black">{new Date(user.created_at).toLocaleDateString()}</td>

                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
