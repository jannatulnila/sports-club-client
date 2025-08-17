// import React from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import useAuth from '../../../Hooks/useAuth';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';

// const PendingBookings = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();

//     const { data: bookings = [], isLoading } = useQuery({
//         queryKey: ['pendingBookings', user?.email],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/bookings?email=${user.email}&status=pending`);
//             return res.data;
//         },
//     });

//     const cancelBookingMutation = useMutation({
//         mutationFn: async (id) => {
//             return await axiosSecure.delete(`/bookings/${id}`);
//         },
//         onSuccess: () => {
//             Swal.fire('Cancelled', 'Booking has been cancelled.', 'success');
//             queryClient.invalidateQueries(['pendingBookings', user.email]);
//         },
//         onError: () => {
//             Swal.fire('Error', 'Failed to cancel booking.', 'error');
//         },
//     });

//     const handleCancel = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: 'You are about to cancel this booking.',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Yes, cancel it!',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 cancelBookingMutation.mutate(id);
//             }
//         });
//     };

//     if (isLoading) return <p>Loading bookings...</p>;

//     if (bookings.length === 0) {
//         return <p className="text-center text-2xl text-secondary mt-6">You have no pending bookings.</p>;
//     }

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4 text-center text-secondary">Panding Booking</h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//                 {bookings.map((booking) => (
//                     <div key={booking._id} className="card bg-base-100 shadow-xl">
//                         <figure>
//                             <img src={booking.image} alt={booking.courtName} className="h-48 w-full object-cover" />
//                         </figure>
//                         <div className="card-body">
//                             <h2 className="card-title">{booking.courtName}</h2>
//                             <p><strong>Type:</strong> {booking.courtType}</p>
//                             <p><strong>Date:</strong> {booking.date}</p>
//                             <p><strong>Slots:</strong> {booking.slots.join(', ')}</p>
//                             <p><strong>Total Price:</strong> ${booking.price}</p>
//                             <button onClick={() => handleCancel(booking._id)} className="btn btn-error mt-2">
//                                 Cancel Booking
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PendingBookings;


import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaCalendarAlt,
  FaClock,
  FaHourglassHalf,
  FaDollarSign,
} from "react-icons/fa";

const PendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["pendingBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${user.email}&status=pending`
      );
      return res.data;
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Cancelled", "Booking has been cancelled.", "success");
      queryClient.invalidateQueries(["pendingBookings", user.email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to cancel booking.", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBookingMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading bookings...</p>;

  if (bookings.length === 0) {
    return (
      <p className="text-center text-2xl text-secondary mt-6">
        You have no pending bookings.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Pending Bookings</h2>
          <p className="text-gray-500">Bookings awaiting admin approval</p>
        </div>
        <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-600 font-medium">
          {bookings.length} Pending
        </span>
      </div>

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
              <span className="inline-block mt-1 text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                Pending Approval
              </span>

              <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-secondary" /> {booking.date}
                </p>
                <p className="flex items-center gap-2">
                  <FaClock className="text-secondary" /> {booking.slots.join(", ")}
                </p>
                <p className="flex items-center gap-2 font-semibold text-green-600">
                  <FaDollarSign /> ${booking.price}
                </p>
                <p className="text-xs text-gray-400">
                  Requested on {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Cancel Button */}
            <div className="flex-shrink-0 mt-3 md:mt-0">
              <button
                onClick={() => handleCancel(booking._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingBookings;
