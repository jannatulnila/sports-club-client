import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaSearch, FaFileExport, FaRedo } from 'react-icons/fa';

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ['confirmed-bookings', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/confirmed?search=${search}`);
      return res.data;
    },
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
        <p className="text-sm text-secondary">Manage Bookings</p>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-2xl font-bold text-green-600">${totalRevenue}</h2>
          </div>
          <FaRedo className="text-green-500 text-lg" />
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="text-sm text-secondary">Confirmed Bookings</p>
            <h2 className="text-2xl font-bold text-blue-600">{bookings.length}</h2>
          </div>
          <FaRedo className="text-blue-500 text-lg" />
        </div>
      </div>

      {/* Search + Export */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
        <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-lg px-3 py-1 w-full md:w-1/2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search bookings by title, user, or court..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 text-sm font-semibold text-gray-600">Booking Details</th>
              <th className="text-left p-3 text-sm font-semibold text-gray-600">User</th>
              <th className="text-left p-3 text-sm font-semibold text-gray-600">Court & Time</th>
              <th className="text-left p-3 text-sm font-semibold text-gray-600">Payment</th>
              <th className="text-left p-3 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                {/* Booking Details */}
                <td className="p-3 text-sm text-gray-700">
                  <p className="font-medium">{booking.title || booking.courtType}</p>
                  <p className="text-xs text-gray-500">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                </td>

                {/* User */}
                <td className="p-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {booking.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{booking.email}</p>
                    </div>
                  </div>
                </td>

                {/* Court & Time */}
                <td className="p-3 text-sm text-gray-700">
                  <p className="font-medium">{booking.courtType}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(booking.date).toLocaleDateString()} - {booking.slots?.join(', ')}
                  </p>
                </td>

                {/* Payment */}
                <td className="p-3 text-sm">
                  <p className="text-green-600 font-semibold">${booking.price}</p>
                  <p className="text-xs text-green-500">Paid</p>
                  <p className="text-xs text-gray-400">{booking.transactionId}</p>
                </td>

                {/* Actions */}
                <td className="p-3 text-sm text-gray-700 flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700">🔍</button>
                  <button className="text-red-500 hover:text-red-700">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && !isLoading && (
          <p className="text-center my-4 text-gray-500">No confirmed bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
