import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['member-confirmed-bookings', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/member-confirmed?search=${search}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-secondary text-center mb-4">Confirmed Bookings</h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by court title..."
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {isLoading ? (
        <p className="text-center">Loading confirmed bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">No confirmed bookings found.</p>
      ) : (
        <div className="overflow-x-auto bg-black p-4 rounded shadow">
          <table className="table">
            <thead className="text-sm">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Court Type</th>
                <th>Slot(s)</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.email}</td>
                  <td>{booking.courtType}</td>
                  <td>{Array.isArray(booking.slots) ? booking.slots.join(', ') : booking.slots}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>${booking.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConfirmedBookings;
