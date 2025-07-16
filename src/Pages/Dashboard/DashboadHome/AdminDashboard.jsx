import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,

  Legend,
  ResponsiveContainer
} from "recharts";
import {
  FaUsers,
  FaCalendarCheck,
  FaUserCheck,
  FaClipboardCheck,
  FaHome
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    }
  });

  if (isLoading) {
    return <p className="text-center text-lg text-primary">Loading Dashboard...</p>;
  }

  const chartData = [
    { name: "Confirmed", value: stats.confirmedBookings || 0 },
    { name: "Pending", value: stats.pendingBookings || 0 },
    {
      name: "Unpaid",
      value: (stats.totalBookings || 0) -
        (stats.confirmedBookings || 0) -
        (stats.pendingBookings || 0)
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        📊 Admin Dashboard Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Card icon={<FaUsers />} label="Total Users" value={stats.totalUsers} color="text-blue-500" />
        <Card icon={<FaClipboardCheck />} label="Total Bookings" value={stats.totalBookings} color="text-green-500" />
        <Card icon={<FaUserCheck />} label="Confirmed Bookings" value={stats.confirmedBookings} color="text-purple-500" />
        <Card icon={<FaCalendarCheck />} label="Pending Bookings" value={stats.pendingBookings} color="text-yellow-500" />
        <Card icon={<FaHome />} label="Total Courts" value={stats.totalCourts} color="text-cyan-500" />
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center text-primary">Booking Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={30} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Card = ({ icon, label, value = 0, color }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
    <div className="flex items-center gap-4">
      <div className={`text-4xl ${color}`}>{icon}</div>
      <div>
        <p className="text-lg font-semibold text-gray-600">{label}</p>
        <p className="text-3xl font-bold text-primary">{value}</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
