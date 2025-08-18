import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";

const ManageBookingApproval = () => {
    const axiosSecure = useAxiosSecure();
    const [actionLoading, setActionLoading] = useState(false);

    // Fetch pending bookings
    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ["pending-bookings"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings?status=pending");
            return res.data;
        },
    });

    // Mutation for updating status
    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ id, status }) =>
            await axiosSecure.patch(`/bookings/${id}`, { status }),
        onSuccess: () => {
            refetch();
        },
    });

    // Approve/Reject action handler
    const handleAction = async (id, action) => {
        const confirm = await Swal.fire({
            title: `${action === "approved" ? "Approve" : "Reject"} booking?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            setActionLoading(true);
            await updateStatus({ id, status: action });
            Swal.fire("Success", `Booking ${action}`, "success");
        } catch (error) {
            Swal.fire("Error", "Failed to update booking", "error");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Booking Approval
                    </h1>
                    <span className="text-gray-500">
                        {bookings.length} pending requests
                    </span>
                </div>

                {/* Loading */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading bookings...</p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No Pending Bookings
                        </h3>
                        <p className="text-gray-500">
                            All bookings have been processed
                        </p>
                    </div>
                ) : (
                    // Cards layout
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                            >
                                {/* User Info */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl">
                                        👤
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-800">
                                            {booking.userName || "Unknown"}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {booking.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Booking Details */}
                                <div className="mt-4 md:mt-0 md:flex md:items-center md:space-x-8">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Court
                                        </p>
                                        <p className="font-medium text-black">
                                            {booking.courtName || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Date
                                        </p>
                                        <p className="font-semibold text-black">
                                            {booking.date || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Time
                                        </p>
                                        <p className="font-medium text-black">
                                            {booking.slots}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Price
                                        </p>
                                        <p className="font-medium text-green-600">
                                            ${booking.price}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 md:mt-0 flex space-x-2">
                                    <button
                                        className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                        onClick={() =>
                                            handleAction(booking._id, "rejected")
                                        }
                                        disabled={actionLoading}
                                    >
                                        <FaTimes className="mr-2" /> Reject
                                    </button>
                                    <button
                                        className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                        onClick={() =>
                                            handleAction(
                                                booking._id,
                                                "approved"
                                            )
                                        }
                                        disabled={actionLoading}
                                    >
                                        <FaCheck className="mr-2" /> Approve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageBookingApproval;
