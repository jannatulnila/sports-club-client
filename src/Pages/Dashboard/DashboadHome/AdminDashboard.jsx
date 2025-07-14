import { useQuery } from "@tanstack/react-query";

import { FaUsers, FaCalendarCheck, FaUserCheck, FaClipboardCheck, FaHome } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    }
  });

  if (isLoading) {
    return <p className="text-center text-lg text-primary">Loading Dashboard...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">📊 Admin Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <FaUsers className="text-4xl text-blue-500" />
            <div>
              <p className="text-lg font-semibold text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-primary">{stats.totalUsers || 0}</p>
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <FaClipboardCheck className="text-4xl text-green-500" />
            <div>
              <p className="text-lg font-semibold text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-primary">{stats.totalBookings || 0}</p>
            </div>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <FaUserCheck className="text-4xl text-purple-500" />
            <div>
              <p className="text-lg font-semibold text-gray-600">Confirmed Bookings</p>
              <p className="text-3xl font-bold text-primary">{stats.confirmedBookings || 0}</p>
            </div>
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <FaCalendarCheck className="text-4xl text-yellow-500" />
            <div>
              <p className="text-lg font-semibold text-gray-600">Pending Bookings</p>
              <p className="text-3xl font-bold text-primary">{stats.pendingBookings || 0}</p>
            </div>
          </div>
        </div>

        {/* Total Courts */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <FaHome className="text-4xl text-cyan-500" />
            <div>
              <p className="text-lg font-semibold text-gray-600">Total Courts</p>
              <p className="text-3xl font-bold text-primary">{stats.totalCourts || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
