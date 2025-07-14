import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


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
        <div className="p-6">
            <h2 className="text-2xl text-secondary text-center font-bold mb-4">Admin Profile</h2>

            <div className="bg-gray-200 p-4 rounded-2xl">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <img
                        src={user?.photoURL}
                        alt="Admin"
                        className="w-20 h-20 rounded-full border-4 border-primary"
                    />
                    <div>
                        <h3 className="text-xl text-secondary font-semibold">{user?.displayName}</h3>
                        <p className="text-sm text-secondary">{user?.email}</p>
                    </div>
                </div>

                {isLoading ? (
                    <p>Loading stats...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-base-200 rounded-xl p-4 shadow">
                            <h4 className="text-lg font-semibold">Total Courts</h4>
                            <p className="text-2xl">{stats.totalCourts}</p>
                        </div>
                        <div className="bg-base-200 rounded-xl p-4 shadow">
                            <h4 className="text-lg font-semibold">Total Users</h4>
                            <p className="text-2xl">{stats.totalUsers}</p>
                        </div>
                        <div className="bg-base-200 rounded-xl p-4 shadow">
                            <h4 className="text-lg font-semibold">Total Members</h4>
                            <p className="text-2xl">{stats.totalMembers}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
