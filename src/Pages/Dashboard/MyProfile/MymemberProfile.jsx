import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserEdit } from "react-icons/fa";

const MyMemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setProfile(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="p-6 my-5 max-w-lg mx-auto bg-white shadow-lg rounded-2xl">
      {/* Header */}
      <h2 className="text-2xl font-bold text-primary text-center mb-6">
        My Profile
      </h2>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={profile.image || user?.photoURL || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/40 shadow-md"
        />
        <h3 className="text-xl font-semibold text-gray-800">
          {profile.name || "N/A"}
        </h3>
        <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
          Member
        </span>
      </div>

      {/* Info Section */}
      <div className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-black">Email:</span>
          <span className="text-black">{profile.email}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-black">Member Since:</span>
          <span className="text-primary">
            {profile.memberSince
              ? new Date(profile.memberSince).toLocaleDateString()
              : "Not a member yet"}
          </span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-black">Role:</span>
          <span className="capitalize text-black">{profile.role || "Member"}</span>
        </div>
      </div>

    </div>
  );
};

export default MyMemberProfile;
