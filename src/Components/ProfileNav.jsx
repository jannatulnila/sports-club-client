import useAuth from "../Hooks/useAuth";
import avatarImg from "../assets/placeholder.jpg";

const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-10 px-4 md:px-8 lg:px-20">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Admin Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.photoURL || avatarImg}
          alt="Admin Avatar"
          className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-md"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {user?.displayName || "Admin User"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
          <p className="mt-2 px-3 py-1 inline-block text-sm bg-yellow-100 text-yellow-800 rounded-md dark:bg-yellow-800 dark:text-yellow-200">
            Role: Admin
          </p>
        </div>
      </div>

      {/* Admin Quick Actions */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            Manage Users
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            View, edit, and delete registered users.
          </p>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            Dashboard Settings
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Customize the admin dashboard layout and preferences.
          </p>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            Reports & Logs
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Access system activity logs and performance reports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
