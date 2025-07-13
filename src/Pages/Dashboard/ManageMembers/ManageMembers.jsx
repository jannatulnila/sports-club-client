import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: members = [], refetch, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/members');
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (email) => await axiosSecure.delete(`/members/${email}`),
    onSuccess: () => {
      Swal.fire("Deleted", "Member removed successfully", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete member", "error");
    }
  });

  const handleDelete = (email) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the member's bookings.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
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
    <div className="p-6 bg-black">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

      <input
        type="text"
        placeholder="Search by name"
        className="input input-bordered mb-4 w-full max-w-xs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        <p>Loading members...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total Bookings</th>
                <th>Latest Booking</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.email}>
                  <td>
                    <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.totalBookings}</td>
                  <td>{member.latestBooking}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(member.email)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No members found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
