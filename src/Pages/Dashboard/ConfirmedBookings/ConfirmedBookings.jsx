// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';

// const ConfirmedBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [search, setSearch] = useState('');

//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ['member-confirmed-bookings', search],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings/member-confirmed?search=${search}`);
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold text-secondary text-center mb-4">Confirmed Bookings</h2>

//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by court title..."
//           className="input input-bordered w-full max-w-md"
//         />
//       </div>

//       {isLoading ? (
//         <p className="text-center">Loading confirmed bookings...</p>
//       ) : bookings.length === 0 ? (
//         <p className="text-center text-gray-500">No confirmed bookings found.</p>
//       ) : (
//         <div className="overflow-x-auto bg-black p-4 rounded shadow">
//           <table className="table">
//             <thead className="text-sm">
//               <tr>
//                 <th>#</th>
//                 <th>Email</th>
//                 <th>Court Type</th>
//                 <th>Slot(s)</th>
//                 <th>Date</th>
//                 <th>Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking, index) => (
//                 <tr key={booking._id}>
//                   <td>{index + 1}</td>
//                   <td>{booking.email}</td>
//                   <td>{booking.courtType}</td>
//                   <td>{Array.isArray(booking.slots) ? booking.slots.join(', ') : booking.slots}</td>
//                   <td>{new Date(booking.date).toLocaleDateString()}</td>
//                   <td>${booking.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConfirmedBookings;


// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import {
//   FaCalendarAlt,
//   FaClock,
//   FaHourglassHalf,
//   FaDollarSign,
// } from "react-icons/fa";

// const ConfirmedBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [search, setSearch] = useState("");

//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ["member-confirmed-bookings", search],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/bookings/member-confirmed?search=${search}`
//       );
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   // Calculate summary
//   const totalBookings = bookings.length;
//   const totalSpent = bookings.reduce((sum, b) => sum + (b.paidAmount || 0), 0);
//   const totalSavings = bookings.reduce(
//     (sum, b) => sum + (b.discountSaved || 0),
//     0
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold text-secondary text-center mb-4">
//         Confirmed Bookings
//       </h2>

//       {/* Search */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by court title..."
//           className="input input-bordered w-full max-w-md"
//         />
//       </div>

//       {/* Loading / Empty */}
//       {isLoading ? (
//         <p className="text-center">Loading confirmed bookings...</p>
//       ) : bookings.length === 0 ? (
//         <p className="text-center text-gray-500">
//           No confirmed bookings found.
//         </p>
//       ) : (
//         <>
//           {/* Booking Cards */}
//           <div className="space-y-4">
//             {bookings.map((booking) => (
//               <div
//                 key={booking._id}
//                 className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-semibold">
//                       {booking.courtName}
//                     </h3>
//                     <div className="flex gap-2 mt-1">
//                       <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
//                         Completed
//                       </span>
//                       {booking.coupon && (
//                         <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
//                           {booking.discountPercent}% OFF
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="text-right text-sm text-gray-500">
//                     <p>
//                       <b>Payment ID:</b> {booking.paymentId}
//                     </p>
//                     <p>
//                       Paid on{" "}
//                       {new Date(booking.paidAt).toLocaleDateString("en-US")}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Info */}
//                 <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
//                   <p className="flex items-center gap-2">
//                     <FaCalendarAlt className="text-blue-600" />{" "}
//                     {new Date(booking.date).toLocaleDateString("en-US")}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <FaClock className="text-blue-600" />{" "}
//                     {Array.isArray(booking.slots)
//                       ? booking.slots.join(", ")
//                       : booking.slots}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <FaHourglassHalf className="text-blue-600" />{" "}
//                     {booking.duration || "N/A"}
//                   </p>
//                   <p className="flex items-center gap-2 font-semibold">
//                     <FaDollarSign className="text-green-600" />{" "}
//                     <span className="text-green-600">
//                       ${booking.paidAmount}
//                     </span>
//                     {booking.originalPrice &&
//                       booking.originalPrice > booking.paidAmount && (
//                         <span className="line-through text-gray-400 text-xs">
//                           ${booking.originalPrice}
//                         </span>
//                       )}
//                   </p>
//                 </div>

//                 {/* Coupon Info */}
//                 {booking.coupon && (
//                   <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-700">
//                     Coupon <b>{booking.coupon}</b> applied –{" "}
//                     {booking.discountPercent}% discount saved $
//                     {booking.discountSaved}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Summary */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//             <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center font-semibold">
//               Total Bookings <br /> {totalBookings}
//             </div>
//             <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-semibold">
//               Total Spent <br /> ${totalSpent.toFixed(2)}
//             </div>
//             <div className="bg-purple-100 text-purple-800 p-4 rounded-lg text-center font-semibold">
//               Total Savings <br /> ${totalSavings.toFixed(2)}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ConfirmedBookings;


// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import {
//   FaCalendarAlt,
//   FaClock,
//   FaHourglassHalf,
//   FaDollarSign,
//   FaCreditCard,
//   FaReceipt,
//   FaMoneyBillWave,
// } from "react-icons/fa";

// const ConfirmedBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [search, setSearch] = useState("");

//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ["member-confirmed-bookings", search],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/bookings/member-confirmed?search=${search}`
//       );
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   // Calculate summary
//   const totalBookings = bookings.length;
//   const totalSpent = bookings.reduce((sum, b) => sum + (b.paidAmount || 0), 0);
//   const totalSavings = bookings.reduce(
//     (sum, b) => sum + (b.discountSaved || 0),
//     0
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold text-secondary text-center mb-4">
//         Confirmed Bookings
//       </h2>

//       {/* Search */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by court title..."
//           className="input input-bordered w-full max-w-md"
//         />
//       </div>

//       {/* Loading / Empty */}
//       {isLoading ? (
//         <p className="text-center">Loading confirmed bookings...</p>
//       ) : bookings.length === 0 ? (
//         <p className="text-center text-gray-500">
//           No confirmed bookings found.
//         </p>
//       ) : (
//         <>
//           {/* Booking Cards */}
//           <div className="space-y-4">
//             {bookings.map((booking) => (
//               <div
//                 key={booking._id}
//                 className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-semibold">
//                       {booking.courtName}
//                     </h3>
//                     <div className="flex gap-2 mt-1">
//                       <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
//                         Confirmed
//                       </span>
//                       {booking.coupon && (
//                         <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
//                           {booking.discountPercent}% OFF
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="text-right text-sm text-gray-500">
//                     <p>
//                       <b>Payment ID:</b> {booking.paymentId}
//                     </p>
//                     <p>
//                       Paid on{" "}
//                       {new Date(booking.paidAt).toLocaleDateString("en-US")}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Info */}
//                 <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
//                   <p className="flex items-center gap-2">
//                     <FaCalendarAlt className="text-blue-600" />{" "}
//                     {new Date(booking.date).toLocaleDateString("en-US")}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <FaClock className="text-blue-600" />{" "}
//                     {Array.isArray(booking.slots)
//                       ? booking.slots.join(", ")
//                       : booking.slots}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <FaHourglassHalf className="text-blue-600" />{" "}
//                     {booking.duration || "N/A"}
//                   </p>
//                   <p className="flex items-center gap-2 font-semibold">
//                     <FaDollarSign className="text-green-600" />{" "}
//                     <span className="text-green-600">
//                       ${booking.paidAmount}
//                     </span>
//                     {booking.originalPrice &&
//                       booking.originalPrice > booking.paidAmount && (
//                         <span className="line-through text-gray-400 text-xs">
//                           ${booking.originalPrice}
//                         </span>
//                       )}
//                   </p>
//                 </div>

//                 {/* Coupon Info */}
//                 {booking.coupon && (
//                   <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-700">
//                     Coupon <b>{booking.coupon}</b> applied –{" "}
//                     {booking.discountPercent}% discount saved $
//                     {booking.discountSaved}
//                   </div>
//                 )}

//                 {/* Payment Details */}
//                 <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
//                   <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                     <FaReceipt className="text-gray-500" /> Payment Details
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
//                     <p className="flex items-center gap-2">
//                       <FaCreditCard className="text-indigo-600" /> Method:{" "}
//                       {booking.paymentMethod || "N/A"}
//                     </p>
//                     <p className="flex items-center gap-2">
//                       <FaMoneyBillWave className="text-green-600" /> Status:{" "}
//                       <span className="font-medium text-green-700">
//                         {booking.paymentStatus || "Paid"}
//                       </span>
//                     </p>
//                     {booking.transactionId && (
//                       <p className="flex items-center gap-2">
//                         <FaReceipt className="text-gray-500" /> Txn ID:{" "}
//                         {booking.transactionId}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Summary */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//             <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center font-semibold">
//               Total Bookings <br /> {totalBookings}
//             </div>
//             <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-semibold">
//               Total Spent <br /> ${totalSpent.toFixed(2)}
//             </div>
//             <div className="bg-purple-100 text-purple-800 p-4 rounded-lg text-center font-semibold">
//               Total Savings <br /> ${totalSavings.toFixed(2)}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ConfirmedBookings;


import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  FaCalendarAlt,
  FaClock,
  FaHourglassHalf,
  FaDollarSign,
  FaCreditCard,
  FaReceipt,
  FaMoneyBillWave,
} from "react-icons/fa";

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  // Fetch confirmed bookings
  const { data: bookings = [], isLoading: isBookingsLoading } = useQuery({
    queryKey: ["member-confirmed-bookings", search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/member-confirmed?search=${search}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  // Fetch payments for this user
  const { data: payments = [], isLoading: isPaymentsLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Merge payments with bookings
  const mergedBookings = bookings.map((b) => {
    const payment = payments.find((p) => p.bookingId === b._id);
    return { ...b, payment };
  });

  // Calculate summary
  const totalBookings = mergedBookings.length;
  const totalSpent = mergedBookings.reduce(
    (sum, b) => sum + (b.payment?.price || 0),
    0
  );
  const totalSavings = mergedBookings.reduce(
    (sum, b) => sum + (b.payment?.discountAmount || 0),
    0
  );

  const isLoading = isBookingsLoading || isPaymentsLoading;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-secondary text-center mb-4">
        Confirmed Bookings
      </h2>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by court title..."
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* Loading / Empty */}
      {isLoading ? (
        <p className="text-center">Loading confirmed bookings...</p>
      ) : mergedBookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No confirmed bookings found.
        </p>
      ) : (
        <>
          {/* Booking Cards */}
          <div className="space-y-4">
            {mergedBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg text-secondary font-semibold">
                      {booking.courtName}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                        Confirmed
                      </span>
                      {booking.payment?.couponCode && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                          Coupon Applied
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {booking.payment && (
                      <>
                        <p>
                          <b>Payment ID:</b> {booking.payment._id}
                        </p>
                        <p>
                          Paid on{" "}
                          {new Date(
                            booking.payment.paid_at
                          ).toLocaleDateString("en-US")}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" />{" "}
                    {new Date(booking.date).toLocaleDateString("en-US")}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-blue-600" />{" "}
                    {Array.isArray(booking.slots)
                      ? booking.slots.join(", ")
                      : booking.slots}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaHourglassHalf className="text-blue-600" />{" "}
                    {booking.duration || "N/A"}
                  </p>
                  {booking.payment && (
                    <p className="flex items-center gap-2 font-semibold">
                      <FaDollarSign className="text-green-600" />{" "}
                      <span className="text-green-600">
                        ${booking.payment.price}
                      </span>
                      {booking.originalPrice &&
                        booking.originalPrice > booking.payment.price && (
                          <span className="line-through text-gray-400 text-xs">
                            ${booking.originalPrice}
                          </span>
                        )}
                    </p>
                  )}
                </div>

                {/* Coupon Info */}
                {booking.payment?.couponCode && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-700">
                    Coupon <b>{booking.payment.couponCode}</b> applied – saved $
                    {booking.payment.discountAmount}
                  </div>
                )}

                {/* Payment Details */}
                {booking.payment && (
                  <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FaReceipt className="text-gray-500" /> Payment Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                      <p className="flex items-center gap-2">
                        <FaCreditCard className="text-indigo-600" /> Method:{" "}
                        {booking.payment.paymentMethod || "N/A"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-green-600" /> Status:{" "}
                        <span className="font-medium text-green-700">
                          Paid
                        </span>
                      </p>
                      {booking.payment.transactionId && (
                        <p className="flex items-center gap-2">
                          <FaReceipt className="text-gray-500" /> Txn ID:{" "}
                          {booking.payment.transactionId}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center font-semibold">
              Total Bookings <br /> {totalBookings}
            </div>
            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-semibold">
              Total Spent <br /> ${totalSpent.toFixed(2)}
            </div>
            <div className="bg-purple-100 text-purple-800 p-4 rounded-lg text-center font-semibold">
              Total Savings <br /> ${totalSavings.toFixed(2)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmedBookings;
