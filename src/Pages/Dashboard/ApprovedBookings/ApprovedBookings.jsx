// import { useQuery, useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";


// const ApprovedBookings = () => {
//     const axiosSecure = useAxiosSecure();
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const { data: bookings = [], refetch, isLoading } = useQuery({
//         queryKey: ['approved-bookings', user?.email],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/bookings?email=${user.email}&status=approved`);
//             return res.data;
//         },
//     });

//     const cancelMutation = useMutation({
//         mutationFn: async (id) => await axiosSecure.delete(`/bookings/${id}`),
//         onSuccess: () => {
//             Swal.fire("Cancelled", "Booking has been cancelled.", "success");
//             refetch();
//         },
//         onError: () => {
//             Swal.fire("Error", "Failed to cancel booking", "error");
//         }
//     });

//     const handleCancel = (id) => {
//         Swal.fire({
//             title: "Cancel this booking?",
//             text: "This will remove the booking from admin view.",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes, cancel it",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 cancelMutation.mutate(id);
//             }
//         });
//     };




//     const handlePayment = (id) => {
//         navigate(`/dashboard/payment/${id}`);
//     };

//     return (
//         <div className="p-6 bg-black">
//             <h2 className="text-2xl font-bold mb-4">Approved Bookings</h2>

//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : bookings.length === 0 ? (
//                 <p>No approved bookings yet.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="table w-full table-zebra">
//                         <thead>
//                             <tr>
//                                 <th>Court</th>
//                                 <th>Slot</th>
//                                 <th>Date</th>
//                                 <th>Price</th>
//                                 <th>Payment</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {bookings.map((booking) => (
//                                 <tr key={booking._id}>
//                                     <td>{booking.courtName}</td>
//                                     <td>{booking.slots?.join(", ")}</td>
//                                     <td>{booking.date}</td>
//                                     <td>${booking.price}</td>
//                                     <td>
//                                         {booking.payment_status === 'paid' ? (
//                                             <span className="badge badge-success">Paid</span>
//                                         ) : (
//                                             <span className="badge badge-warning">Unpaid</span>
//                                         )}
//                                     </td>
//                                     <td className="space-x-2">
//                                         {booking.payment_status !== 'paid' && (
//                                             <button
//                                                 className="btn btn-xs btn-success"
//                                                 onClick={() => handlePayment(booking._id)}
//                                             >
//                                                 Pay Now
//                                             </button>
//                                         )}
//                                         <button
//                                             className="btn btn-xs btn-error"
//                                             onClick={() => handleCancel(booking._id)}
//                                         >
//                                             Cancel
//                                         </button>
//                                     </td>


//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ApprovedBookings;


import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  FaCalendarAlt,
  FaClock,
  FaHourglassHalf,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";

const ApprovedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ["approved-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${user.email}&status=approved`
      );
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
    },
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

  const handlePayment = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-2xl text-secondary text-center font-bold">Approved Bookings</h2>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          
          <p className="text-gray-500">
            Approved bookings ready for payment
          </p>
        </div>
        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
          {bookings.length} Approved
        </span>
      </div>

      {/* Booking Cards */}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No approved bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow rounded-xl p-5 border border-gray-200 flex flex-col gap-3 md:flex-row md:items-center justify-between"
            >
              {/* Left Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {booking.courtName}
                </h3>
                <span className="inline-block mt-1 text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  Approved - Payment Required
                </span>

                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-600" /> {booking.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-green-600" />{" "}
                    {booking.slots.join(", ")}
                  </p>
                  <p className="flex items-center gap-2 font-semibold text-green-600">
                    <FaDollarSign /> ${booking.price}
                  </p>
                  <p className="text-xs text-gray-400">
                    Approved on{" "}
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex-shrink-0 flex gap-2 mt-3 md:mt-0">
                {booking.payment_status !== "paid" && (
                  <button
                    onClick={() => handlePayment(booking._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-600 transition"
                  >
                    Pay Now
                  </button>
                )}
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Instructions */}
      {bookings.length > 0 && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-2">
            <FaInfoCircle /> Payment Instructions
          </h3>
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
            <li>
              Click <b>"Pay Now"</b> to proceed to the secure payment page
            </li>
            <li>
              Payment must be completed within 24 hours of approval
            </li>
            <li>
              After successful payment, your booking will be confirmed
            </li>
            <li>
              You can apply discount coupons during the payment process
            </li>
            <li>
              Confirmed bookings will appear in{" "}
              <b>"Confirmed Bookings"</b> section
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApprovedBookings;
