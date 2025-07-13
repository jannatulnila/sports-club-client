// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';


// const ManageConfirmedBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [search, setSearch] = useState('');

//   const { data: bookings = [], refetch, isLoading } = useQuery({
//     queryKey: ['confirmed-bookings', search],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings/confirmed?search=${search}`);
//       return res.data;
//     },
//   });

//   const handleSearch = (e) => {
//     e.preventDefault();
//     refetch();
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Manage Confirmed Bookings</h2>

//       <form onSubmit={handleSearch} className="mb-4 flex gap-2">
//         <input
//           type="text"
//           placeholder="Search by court type..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="input input-bordered w-full max-w-xs"
//         />
//         <button type="submit" className="btn btn-primary">Search</button>
//       </form>

//       {isLoading ? (
//         <p>Loading bookings...</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow rounded">
//           <table className="table">
//             <thead className="bg-base-200">
//               <tr>
//                 <th>#</th>
//                 <th>User</th>
//                 <th>Email</th>
//                 <th>Court</th>
//                 <th>Slots</th>
//                 <th>Price</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking, idx) => (
//                 <tr key={booking._id}>
//                   <td>{idx + 1}</td>
//                   <td>{booking.name || 'N/A'}</td>
//                   <td>{booking.email}</td>
//                   <td>{booking.courtType}</td>
//                   <td>{Array.isArray(booking.slots) ? booking.slots.join(', ') : booking.slots}</td>
//                   <td>${booking.price}</td>
//                   <td>{new Date(booking.date).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {bookings.length === 0 && (
//             <p className="text-center my-4 text-gray-500">No confirmed bookings found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageConfirmedBookings;
