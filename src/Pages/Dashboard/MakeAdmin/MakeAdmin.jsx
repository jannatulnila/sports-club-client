// import { useState } from "react";
// import Swal from "sweetalert2";

// import { useMutation } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const MakeAdmin = () => {
//   const axiosSecure = useAxiosSecure();
//   const [emailQuery, setEmailQuery] = useState("");
//   const [userResult, setUserResult] = useState(null);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!emailQuery) return;

//     try {
//       const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
//       setUserResult(res.data);
//     } catch (err) {
//       Swal.fire("Error", err.response?.data?.message || "User not found", "error");
//       setUserResult(null);
//     }
//   };

//   const makeAdminMutation = useMutation({
//     mutationFn: async () => {
//       const res = await axiosSecure.put("/users/admin", { email: userResult.email });
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire("Success", "User promoted to admin", "success");
//       setUserResult((prev) => ({ ...prev, role: "admin" }));
//     },
//     onError: () => {
//       Swal.fire("Error", "Failed to make admin", "error");
//     },
//   });

//   const removeAdminMutation = useMutation({
//     mutationFn: async () => {
//       const res = await axiosSecure.put("/users/remove-admin", { email: userResult.email });
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire("Success", "User removed from admin", "success");
//       setUserResult((prev) => ({ ...prev, role: "user" }));
//     },
//     onError: () => {
//       Swal.fire("Error", "Failed to remove admin", "error");
//     },
//   });

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Search & Manage Admin</h2>
//       <form onSubmit={handleSearch} className="flex gap-2 mb-4">
//         <input
//           type="email"
//           className="border p-2 w-full"
//           value={emailQuery}
//           onChange={(e) => setEmailQuery(e.target.value)}
//           placeholder="Enter user email"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Search
//         </button>
//       </form>

//       {userResult && (
//         <div className="border p-4 rounded bg-gray-100">
//           <p><strong>Email:</strong> {userResult.email}</p>
//           <p><strong>Role:</strong> {userResult.role}</p>
//           <p><strong>Created At:</strong> {new Date(userResult.createdAt).toLocaleDateString()}</p>

//           {userResult.role === "admin" ? (
//             <button
//               onClick={() => removeAdminMutation.mutate()}
//               className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
//             >
//               Remove Admin
//             </button>
//           ) : (
//             <button
//               onClick={() => makeAdminMutation.mutate()}
//               className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Make Admin
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MakeAdmin;



import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [emailQuery, setEmailQuery] = useState("");

    const {
        data: users = [],
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["searchedUsers", emailQuery],
        enabled: !!emailQuery,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
            return res.data;
        },
    });

    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ id, role }) =>
            await axiosSecure.patch(`/users/${id}/role`, { role }),
        onSuccess: () => {
            refetch();
        },
    });

    const handleRoleChange = async (id, currentRole) => {
        const action = currentRole === "admin" ? "Remove admin" : "Make admin";
        const newRole = currentRole === "admin" ? "user" : "admin";

        const confirm = await Swal.fire({
            title: `${action}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            await updateRole({ id, role: newRole });
            Swal.fire("Success", `${action} successful`, "success");
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Failed to update user role", "error");
        }
    };

    return (
        <div className="p-6 ">
            <h2 className="text-2xl font-semibold text-secondary text-center mb-4">Make Admin</h2>

            <div className="flex gap-2 mb-6 items-center">
                <FaSearch />
                <input
                    type="text"
                    className="input input-bordered w-full max-w-md"
                    placeholder="Search user by email"
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                />
            </div>

            {isFetching && <p>Loading users...</p>}

            {!isFetching && users.length === 0 && emailQuery && (
                <p className="text-gray-500">No users found.</p>
            )}

            {users.length > 0 && (
                <div className="overflow-x-auto bg-gray-500">
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Created At</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id}>
                                    <td>{u.email}</td>
                                    <td>{new Date(u.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <span
                                            className={`badge ${u.role === "admin" ? "badge-success" : "badge-ghost"
                                                }`}
                                        >
                                            {u.role || "user"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleRoleChange(u._id, u.role || "user")}
                                            className={`btn btn-sm text-black ${u.role === "admin" ? "btn-error" : "btn-primary"
                                                }`}
                                        >
                                            {u.role === "admin" ? (
                                                <>
                                                    <FaUserTimes className="mr-1" />
                                                    Remove Admin
                                                </>
                                            ) : (
                                                <>
                                                    <FaUserShield className="mr-1" />
                                                    Make Admin
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MakeAdmin;