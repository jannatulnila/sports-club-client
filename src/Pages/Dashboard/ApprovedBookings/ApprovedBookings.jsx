import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const ApprovedBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ['approved-bookings', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}&status=approved`);
            return res.data;
        },
    });

    const cancelMutation = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/bookings/${id}`),
        onSuccess: () => {
            Swal.fire("Cancelled", "Booking has been cancelled.", "success");
            refetch();
        },
        onError: () => {
            Swal.fire("Error", "Failed to cancel booking", "error");
        }
    });

    const handleCancel = (id) => {
        Swal.fire({
            title: "Cancel this booking?",
            text: "This will remove the booking from admin view.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it",
        }).then((result) => {
            if (result.isConfirmed) {
                cancelMutation.mutate(id);
            }
        });
    };

    //   const handlePayment = (id) => {
    //     // Redirect to /dashboard/payment and pass booking info
    //     navigate(`/dashboard/payment/${id}`);
    //   };


    const handlePayment = (id) => {
        navigate(`/dashboard/payment/${id}`);
    };

    return (
        <div className="p-6 bg-black">
            <h2 className="text-2xl font-bold mb-4">Approved Bookings</h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : bookings.length === 0 ? (
                <p>No approved bookings yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>Court</th>
                                <th>Slot</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.courtName}</td>
                                    <td>{booking.slots?.join(", ")}</td>
                                    <td>{booking.date}</td>
                                    <td>${booking.price}</td>
                                     <td>
        {booking.payment_status === 'paid' ? (
          <span className="badge badge-success">Paid</span>
        ) : (
          <span className="badge badge-warning">Unpaid</span>
        )}
      </td>
      <td className="space-x-2">
        {booking.payment_status !== 'paid' && (
          <button
            className="btn btn-xs btn-success"
            onClick={() => handlePayment(booking._id)}
          >
            Pay Now
          </button>
        )}
        <button
          className="btn btn-xs btn-error"
          onClick={() => handleCancel(booking._id)}
        >
          Cancel
        </button>
      </td>

                                    {/* <td className="space-x-2">
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={() => handlePayment(booking._id)}
                                        >
                                            Pay Now
                                        </button>
                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => handleCancel(booking._id)}
                                        >
                                            Cancel
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApprovedBookings;
