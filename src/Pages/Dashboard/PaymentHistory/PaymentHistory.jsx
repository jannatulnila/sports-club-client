// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";
// import { useState } from "react";
// import { FaThList, FaThLarge } from "react-icons/fa";

// const PaymentHistory = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

//   const { data: payments = [], isLoading } = useQuery({
//     queryKey: ['payments', user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments?email=${user.email}`);
//       return res.data;
//     }
//   });

//   if (isLoading) {
//     return <p className="text-center">Loading payment history...</p>;
//   }

//   const toggleView = () => {
//     setViewMode(prev => (prev === 'table' ? 'card' : 'table'));
//   };

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-secondary text-center">My Payment History</h2>
//         <button
//           onClick={toggleView}
//           className="btn btn-outline bg-black btn-sm"
//         >
//           {viewMode === 'table' ? (
//             <>
//               <FaThLarge className="mr-2" /> Card View
//             </>
//           ) : (
//             <>
//               <FaThList className="mr-2" /> Table View
//             </>
//           )}
//         </button>
//       </div>

//       {viewMode === 'table' ? (
//         <div className="overflow-x-auto rounded shadow">
//           <table className="table bg-black w-full">
//             <thead>
//               <tr className="bg-base-200 text-sm">
//                 <th>#</th>
//                 <th>Transaction ID</th>
//                 <th>Amount</th>
//                 <th>Method</th>
//                 <th>Coupon</th>
//                 <th>Discount</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.map((p, index) => (
//                 <tr key={p._id} className="hover">
//                   <td>{index + 1}</td>
//                   <td className="text-xs break-all">{p.transactionId}</td>
//                   <td>${p.price.toFixed(2)}</td>
//                   <td>{p.paymentMethod?.[0] || "Card"}</td>
//                   <td>{p.couponCode || "-"}</td>
//                   <td>
//                     {p.discountAmount
//                       ? `$${parseFloat(p.discountAmount).toFixed(2)}`
//                       : '-'}
//                   </td>
//                   <td>{new Date(p.paid_at).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-4">
//           {payments.map((p, index) => (
//             <div key={p._id} className="bg-black text-center shadow p-4 rounded-lg border border-gray-200">
//               <h3 className="font-semibold text-lg text-primary mb-2">Payment #{index + 1}</h3>
//               <p><span className="font-medium">Transaction ID:</span> <span className="text-sm break-all">{p.transactionId}</span></p>
//               <p><span className="font-medium">Amount:</span> ${p.price.toFixed(2)}</p>
//               <p><span className="font-medium">Method:</span> {p.paymentMethod?.[0] || "Card"}</p>
//               <p><span className="font-medium">Coupon:</span> {p.couponCode || '-'}</p>
//               <p><span className="font-medium">Discount:</span> {p.discountAmount ? `$${parseFloat(p.discountAmount).toFixed(2)}` : '-'}</p>
//               <p><span className="font-medium">Date:</span> {new Date(p.paid_at).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentHistory;


import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  FaSearch,
  FaCheckCircle,
  FaMoneyBillWave,
  FaTags,
  FaList,
} from "react-icons/fa";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Payments");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Stats
  const totalPaid = useMemo(
    () => payments.reduce((sum, p) => sum + p.price, 0),
    [payments]
  );
  const totalSavings = useMemo(
    () => payments.reduce((sum, p) => sum + (p.discountAmount || 0), 0),
    [payments]
  );
  const totalTxns = payments.length;

  // Filter + Search
  const filteredPayments = payments.filter((p) => {
    const matchSearch =
      p.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
      p.bookingCourt?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All Payments" ? true : p.paymentMethod === filter;
    return matchSearch && matchFilter;
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Payment History</h2>
          <p className="text-gray-500">
            Track all your payment transactions
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
          {totalTxns} Payments
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-xl bg-green-100 flex items-center gap-3">
          <FaMoneyBillWave className="text-green-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Total Paid</p>
            <h3 className="text-lg font-bold text-green-700">
              ${totalPaid.toFixed(2)}
            </h3>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-blue-100 flex items-center gap-3">
          <FaTags className="text-blue-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Total Savings</p>
            <h3 className="text-lg font-bold text-blue-700">
              ${totalSavings.toFixed(2)}
            </h3>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-pink-100 flex items-center gap-3">
          <FaList className="text-pink-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Transactions</p>
            <h3 className="text-lg font-bold text-pink-700">{totalTxns}</h3>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by court name or payment ID..."
            className="input input-bordered w-full pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="select select-bordered w-40"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All Payments</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
          <option>Digital Wallet</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white shadow">
        <table className="table w-full">
          <thead className="bg-secondary text-sm">
            <tr>
              <th>Payment Details</th>
              <th>Booking Id</th>
              <th>Amount</th>
              <th>Discount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p._id} className="hover">
                {/* Payment Details */}
                <td className="text-sm">
                  <p className="font-medium text-blue-500">{p.transactionId}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(p.paid_at).toLocaleDateString()} •{" "}
                    {p.paymentMethod}
                  </p>
                </td>

                {/* Booking Info */}
                <td className="text-sm">
                  <p className="font-medium text-blue-500">{p.bookingId || "Court A"}</p>
                </td>

                {/* Amount */}
                <td>
                  <span className="text-green-600 font-semibold">
                    ${p.price.toFixed(2)}
                  </span>
                  {p.originalPrice && p.originalPrice > p.price && (
                    <span className="line-through text-gray-400 ml-2">
                      ${p.originalPrice}
                    </span>
                  )}
                </td>

                {/* Discount */}
                <td className="text-sm">
                  {p.couponCode ? (
                    <>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">
                        {p.couponCode}
                      </span>
                      <span className="text-green-600">
                        -${p.discountAmount?.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400">No discount</span>
                  )}
                </td>

                {/* Status */}
                <td>
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <FaCheckCircle /> Completed
                  </span>
                </td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  No matching payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
