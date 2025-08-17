// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../Hooks/useAuth';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';


// const MemberDashboard = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ['member-bookings'],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings/member-confirmed`);
//       return res.data;
//     },
//   });

//   const totalBookings = bookings.length;
//   const pending = bookings.filter(b => b.status === 'pending').length;
//   const paid = bookings.filter(b => b.payment_status === 'paid').length;

//   return (
//     <div className="p-6 bg-white min-h-screen">
//       <h2 className="text-2xl font-bold mb-4 text-primary">Welcome, {user?.displayName || 'Member'}!</h2>
//       <p className="text-gray-600 mb-6">Email: {user?.email}</p>

//       {isLoading ? (
//         <p>Loading bookings...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="p-6 rounded-lg shadow">
//             <h3 className="text-xl text-secondary font-semibold">Total Bookings</h3>
//             <p className="text-3xl text-secondary mt-2 ">{totalBookings}</p>
//           </div>

//           <div className="p-6 rounded-lg shadow">
//             <h3 className="text-xl text-secondary font-semibold">Pending</h3>
//             <p className="text-3xl text-secondary mt-2 ">{pending}</p>
//           </div>

//           <div className=" p-6 rounded-lg shadow">
//             <h3 className="text-xl text-secondary font-semibold">Paid</h3>
//             <p className="text-3xl text-secondary mt-2">{paid}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MemberDashboard;


import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MemberDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["member-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/member-confirmed`);
      return res.data;
    },
  });

  const totalBookings = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const paid = bookings.filter((b) => b.payment_status === "paid").length;

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-2 text-primary">
        Welcome, {user?.displayName || "Member"}!
      </h2>
      <p className="text-gray-800 dark:text-gray-800 mb-6">
        Email: {user?.email}
      </p>

      {/* Stats Cards */}
      {isLoading ? (
        <p>Loading bookings...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-lg shadow bg-gray-200 text-center">
              <h3 className="text-xl text-secondary font-semibold">
                Total Bookings
              </h3>
              <p className="text-3xl font-bold text-primary mt-2">
                {totalBookings}
              </p>
            </div>

            <div className="p-6 rounded-lg shadow bg-gray-200 text-center">
              <h3 className="text-xl text-secondary font-semibold">Pending</h3>
              <p className="text-3xl font-bold text-yellow-500 mt-2">
                {pending}
              </p>
            </div>

            <div className="p-6 rounded-lg shadow bg-gray-200 text-center">
              <h3 className="text-xl text-secondary font-semibold">Paid</h3>
              <p className="text-3xl font-bold text-green-500 mt-2">{paid}</p>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-base-200 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Recent Bookings
            </h3>

            {bookings.length === 0 ? (
              <p className="text-gray-500">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th>#</th>
                      <th>Court</th>
                      <th>Date</th>
                      <th>Slots</th>
                      <th>Status</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b, idx) => (
                      <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td>{idx + 1}</td>
                        <td>{b.courtType}</td>
                        <td>{new Date(b.date).toLocaleDateString()}</td>
                        <td>
                          {Array.isArray(b.slots)
                            ? b.slots.join(", ")
                            : b.slots}
                        </td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              b.status === "pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              b.payment_status === "paid"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {b.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MemberDashboard;
