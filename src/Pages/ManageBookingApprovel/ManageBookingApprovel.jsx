import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";

const ManageBookingApproval = () => {
    const axiosSecure = useAxiosSecure();
    const [actionLoading, setActionLoading] = useState(false);


    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ['pending-bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings?status=pending");
            return res.data;
        },
    });

    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ id, status }) =>
            await axiosSecure.patch(`/bookings/${id}`, { status }),
        onSuccess: () => {
            refetch();
        },
    });

    const handleAction = async (id, action) => {
        const confirm = await Swal.fire({
            title: `${action === 'approved' ? 'Approve' : 'Reject'} booking?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        });

        if (!confirm.isConfirmed) return;

        try {
            await updateStatus({ id, status: action });
            Swal.fire("Success", `Booking ${action}`, "success");
        } catch (error) {
            Swal.fire("Error", "Failed to update booking", "error");
        }
    };

    return (
        <div className="p-6 bg-black">
            <h2 className="text-2xl font-bold text-center mb-4">Manage Booking Approvals</h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : bookings.length === 0 ? (
                <p className="text-gray-500">No pending bookings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Court</th>
                                <th>Slots</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>{booking.email}</td>
                                    <td>{booking.courtName || "N/A"}</td>
                                    <td>{booking.selectedSlots?.join(", ")}</td>
                                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                                    <td>${booking.totalPrice}</td>
                                    {/* <td>
                                        <span className="badge badge-warning">{booking.status}</span>
                                    </td> */}

                                    <td>
                                        <span className={`badge ${booking.status === "pending" ? "badge-warning" :
                                                booking.status === "approved" ? "badge-success" :
                                                    booking.status === "rejected" ? "badge-error" :
                                                        "badge-ghost"
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="space-x-2">
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={() => handleAction(booking._id, 'approved')}
                                            disabled={actionLoading}
                                        >
                                            {actionLoading ? "..." : "Accept"}
                                        </button>
                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => handleAction(booking._id, 'rejected')}
                                        >
                                            Reject
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

export default ManageBookingApproval;
