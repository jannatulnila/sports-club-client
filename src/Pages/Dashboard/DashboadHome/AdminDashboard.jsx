// import { useQuery } from "@tanstack/react-query";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,

//   Legend,
//   ResponsiveContainer
// } from "recharts";
// import {
//   FaUsers,
//   FaCalendarCheck,
//   FaUserCheck,
//   FaClipboardCheck,
//   FaHome
// } from "react-icons/fa";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// const AdminDashboard = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: stats = {}, isLoading } = useQuery({
//     queryKey: ["admin-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/admin/stats");
//       return res.data;
//     }
//   });

//   if (isLoading) {
//     return <p className="text-center text-lg text-primary">Loading Dashboard...</p>;
//   }

//   const chartData = [
//     { name: "Confirmed", value: stats.confirmedBookings || 0 },
//     { name: "Pending", value: stats.pendingBookings || 0 },
//     {
//       name: "Unpaid",
//       value: (stats.totalBookings || 0) -
//         (stats.confirmedBookings || 0) -
//         (stats.pendingBookings || 0)
//     }
//   ];

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold text-center mb-6 text-primary">
//         📊 Admin Dashboard Overview
//       </h2>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         <Card icon={<FaUsers />} label="Total Users" value={stats.totalUsers} color="text-blue-500" />
//         <Card icon={<FaClipboardCheck />} label="Total Bookings" value={stats.totalBookings} color="text-green-500" />
//         <Card icon={<FaUserCheck />} label="Confirmed Bookings" value={stats.confirmedBookings} color="text-purple-500" />
//         <Card icon={<FaCalendarCheck />} label="Pending Bookings" value={stats.pendingBookings} color="text-yellow-500" />
//         <Card icon={<FaHome />} label="Total Courts" value={stats.totalCourts} color="text-cyan-500" />
//       </div>

//       {/* Pie Chart */}
//       <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
//         <h3 className="text-xl font-semibold mb-4 text-center text-primary">Booking Summary</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               dataKey="value"
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label
//             >
//               {chartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend verticalAlign="bottom" height={30} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// const Card = ({ icon, label, value = 0, color }) => (
//   <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//     <div className="flex items-center gap-4">
//       <div className={`text-4xl ${color}`}>{icon}</div>
//       <div>
//         <p className="text-lg font-semibold text-gray-600">{label}</p>
//         <p className="text-3xl font-bold text-primary">{value}</p>
//       </div>
//     </div>
//   </div>
// );

// export default AdminDashboard;


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
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg font-medium text-primary animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  const chartData = [
    { name: "Confirmed", value: stats.confirmedBookings || 0 },
    { name: "Pending", value: stats.pendingBookings || 0 },
    {
      name: "Unpaid",
      value:
        (stats.totalBookings || 0) -
        (stats.confirmedBookings || 0) -
        (stats.pendingBookings || 0)
    }
  ];

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-primary">
        📊 Admin Dashboard
      </h2>
      <p className="text-center text-gray-500">
        Overview of system statistics & bookings
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          icon={<FaUsers />}
          label="Total Users"
          value={stats.totalUsers}
          color="bg-blue-100 text-blue-600"
        />
        <Card
          icon={<FaClipboardCheck />}
          label="Total Bookings"
          value={stats.totalBookings}
          color="bg-green-100 text-green-600"
        />
        <Card
          icon={<FaUserCheck />}
          label="Confirmed Bookings"
          value={stats.confirmedBookings}
          color="bg-purple-100 text-purple-600"
        />
        <Card
          icon={<FaCalendarCheck />}
          label="Pending Bookings"
          value={stats.pendingBookings}
          color="bg-yellow-100 text-yellow-600"
        />
        <Card
          icon={<FaHome />}
          label="Total Courts"
          value={stats.totalCourts}
          color="bg-cyan-100 text-cyan-600"
        />
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-center text-primary">
          Booking Summary
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              dataKey="value"
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [value, "Bookings"]}
              contentStyle={{
                borderRadius: "8px",
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb"
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ icon, label, value = 0, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
    <div className="flex items-center gap-5">
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full ${color} shadow-inner`}
      >
        <span className="text-3xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-3xl font-bold text-primary">{value}</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
