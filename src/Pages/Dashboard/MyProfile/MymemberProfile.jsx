import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
;

const MyMemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then(res => {
        setProfile(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-black shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="flex flex-col items-center gap-4">
        <img
          src={profile.image || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover"
        />
        <p><strong>Name:</strong> {profile.name || "N/A"}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p>
          <strong>Member Since:</strong>{" "}
          {profile.memberSince
            ? new Date(profile.memberSince).toLocaleDateString()
            : "Not a member yet"}
        </p>
      </div>
    </div>
  );
};

export default MyMemberProfile;
