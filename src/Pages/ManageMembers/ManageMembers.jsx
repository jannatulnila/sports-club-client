import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageMembers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");

    const { data: members = [], refetch, isLoading } = useQuery({
        queryKey: ["members", search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/members?name=${search}`);
            return res.data;
        },
    });

    const { mutateAsync: deleteMember } = useMutation({
        mutationFn: async (email) => await axiosSecure.delete(`/members/${email}`),
        onSuccess: () => refetch(),
    });

    const handleDelete = async (email) => {
        const confirm = await Swal.fire({
            title: "Remove this member?",
            text: "This will also delete all their bookings!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
        });

        if (confirm.isConfirmed) {
            try {
                await deleteMember(email);
                Swal.fire("Deleted!", "Member has been removed.", "success");
            } catch (err) {
                Swal.fire("Error", "Failed to remove member", "error");
            }
        }
    };

    return (
        <div className="p-6 bg-black">
            <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

            <div className="form-control mb-4 max-w-md">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="input input-bordered"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {isLoading ? (
                <p>Loading members...</p>
            ) : members.length === 0 ? (
                <p className="text-gray-500">No members found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Email</th>
                                <th>Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member, i) => (
                                <tr key={member.email}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <img src={member.image} alt="avatar" className="w-10 h-10 rounded-full" />
                                    </td>
                                    <td>{member.email}</td>
                                    <td>{new Date(member.created_at).toLocaleDateString()}</td>
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
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageMembers;
