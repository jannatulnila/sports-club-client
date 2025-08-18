import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
    FaPlus,
    FaTicketAlt,
    FaBullhorn,
    FaCog,
    FaTableTennis,
    FaUsers,
    FaUserFriends
} from "react-icons/fa";
import { Link, NavLink } from "react-router";

const AdminProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["admin-profile-stats"],
        queryFn: async () => {
            const [courtsRes, usersRes, membersRes] = await Promise.all([
                axiosSecure.get("/admin/stats/courts"),
                axiosSecure.get("/admin/stats/users"),
                axiosSecure.get("/admin/stats/members"),
            ]);

            return {
                totalCourts: courtsRes.data.totalCourts,
                totalUsers: usersRes.data.totalUsers,
                totalMembers: membersRes.data.totalMembers,
            };
        },
    });

    return (
        <div className="p-6 space-y-8">
            {/* Profile Header */}
            <div className="bg-blue-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow">
                <div className="relative">
                    <img
                        src={user?.photoURL}
                        alt="Admin"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                    <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-800">{user?.displayName}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <span
                        className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium bg-primary mt-2">
                        Admin
                    </span>
                    <div className="mt-4 flex justify-center sm:justify-start gap-3">
                        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Edit Profile
            </button> */}
                    </div>
                </div>
            </div>

            {/* Dashboard Stats */}
            {isLoading ? (
                <p className="text-center text-gray-500">Loading stats...</p>
            ) : (
                <div>
                    <h4 className="font-semibold text-gray-700 mb-4">Dashboard Statistics</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <StatCard
                            icon={<FaTableTennis />}
                            label="Total Courts"
                            value={stats.totalCourts}
                            color="bg-blue-100 text-blue-600"
                        />
                        <StatCard
                            icon={<FaUsers />}
                            label="Total Users"
                            value={stats.totalUsers}
                            color="bg-green-100 text-green-600"
                        />
                        <StatCard
                            icon={<FaUserFriends />}
                            label="Total Members"
                            value={stats.totalMembers}
                            color="bg-purple-100 text-purple-600"
                        />
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div>
                <h4 className="font-semibold text-gray-700 mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-secondary">
                    <Link to="/dashboard/add-court" >
                        <ActionButton icon={<FaPlus />} label="Add Court"  />
                    </Link>
                    <Link to="/dashboard/manage-coupons" className="">
                        <ActionButton icon={<FaTicketAlt />} label="New Coupon" />
                     </Link>
                    <Link to="/dashboard/make-announcement" className="">
                        <ActionButton icon={<FaBullhorn />} label="Announcement" />
                    </Link>
                    <Link to="/dashboard/manage-bookings" className="">
                    <ActionButton icon={<FaCog />} label="Settings" />
                    </Link>
                    
                    
                </div>
            </div>
        </div>
    );
};

// Stats Card Component
const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
        <div
            className={`w-12 h-12 flex items-center justify-center rounded-lg ${color}`}
        >
            <span className="text-2xl">{icon}</span>
        </div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <span className="text-green-500 text-xs">↑ Active</span>
        </div>
    </div>
);

// Quick Action Button
const ActionButton = ({ icon, label }) => (
  <div className="w-full">
    <button className="flex flex-col items-center justify-center p-5 bg-white rounded-xl shadow hover:shadow-lg transition w-full h-full">
      <div className="text-2xl mb-2 text-primary">{icon}</div>
      <p className="text-sm font-medium text-gray-700 text-center">{label}</p>
    </button>
  </div>
);

export default AdminProfile;
