// import { useQuery, useMutation } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import { useState } from 'react';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';


// const ManageMembers = () => {
//     const axiosSecure = useAxiosSecure();
//     const [searchTerm, setSearchTerm] = useState("");

//     const { data: members = [], refetch, isLoading } = useQuery({
//         queryKey: ['members'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/members');
//             return res.data;
//         }
//     });

//     const deleteMutation = useMutation({
//         mutationFn: async (email) => await axiosSecure.delete(`/members/${email}`),
//         onSuccess: () => {
//             Swal.fire("Deleted", "Member removed successfully", "success");
//             refetch();
//         },
//         onError: () => {
//             Swal.fire("Error", "Failed to delete member", "error");
//         }
//     });

//     const handleDelete = (email) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "This will delete the member's bookings.",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Yes, delete',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 deleteMutation.mutate(email);
//             }
//         });
//     };

//     const filteredMembers = members.filter((m) =>
//         m.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="p-6 ">
//             <h2 className="text-2xl font-bold text-secondary text-center mb-4">Manage Members</h2>
//             <div className="flex justify-center mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search by name"
//                     className="input input-bordered items-center justify-center mb-4 w-full max-w-xs"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>

//             <div className='bg-black'>


//                 {isLoading ? (
//                     <p>Loading members...</p>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="table w-full">
//                             <thead>
//                                 <tr>
//                                     <th>Image</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Total Bookings</th>
//                                     <th>Latest Booking</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredMembers.map((member) => (
//                                     <tr key={member.email}>
//                                         <td>
//                                             <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full" />
//                                         </td>
//                                         <td>{member.name}</td>
//                                         <td>{member.email}</td>
//                                         <td>{member.totalBookings}</td>
//                                         <td>{member.latestBooking}</td>
//                                         <td>
//                                             <button
//                                                 onClick={() => handleDelete(member.email)}
//                                                 className="btn btn-sm btn-error"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                                 {filteredMembers.length === 0 && (
//                                     <tr>
//                                         <td colSpan="6" className="text-center">No members found</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ManageMembers;


import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: members = [], refetch, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/members");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (email) => await axiosSecure.delete(`/members/${email}`),
    onSuccess: () => {
      Swal.fire("Deleted", "Member removed successfully", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete member", "error");
    },
  });

  const handleDelete = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the member's bookings.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(email);
      }
    });
  };

  const filteredMembers = members.filter((m) =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-secondary">Manage Members</h2>

      {/* Search & Export */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search members by name or email..."
          className="input input-bordered w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary ml-3">⬇ Export</button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {isLoading ? (
          <p className="p-4">Loading members...</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr className="bg-secondary">
                <th>Member</th>
                <th>Bookings</th>
                <th>Last Activity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.email} className="hover:bg-gray-50">
                  {/* Member Info */}
                  <td className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={member.image || "/default-avatar.png"}
                          alt={member.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-black">{member.name}</div>
                      <div className="text-sm text-gray-500">
                        {member.email}
                      </div>
                    </div>
                  </td>
                  <td className="text-black">{member.totalBookings || 0}</td>

                  <td className="text-black">{member.lastActivity || "-"}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {member.status || "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <button
                      onClick={() => handleDelete(member.email)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No members found
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

export default ManageMembers;
