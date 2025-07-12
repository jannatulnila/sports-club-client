import { useState } from "react";
import Swal from "sweetalert2";

import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");
  const [userResult, setUserResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!emailQuery) return;

    try {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      setUserResult(res.data);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "User not found", "error");
      setUserResult(null);
    }
  };

  const makeAdminMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.put("/users/admin", { email: userResult.email });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "User promoted to admin", "success");
      setUserResult((prev) => ({ ...prev, role: "admin" }));
    },
    onError: () => {
      Swal.fire("Error", "Failed to make admin", "error");
    },
  });

  const removeAdminMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.put("/users/remove-admin", { email: userResult.email });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "User removed from admin", "success");
      setUserResult((prev) => ({ ...prev, role: "user" }));
    },
    onError: () => {
      Swal.fire("Error", "Failed to remove admin", "error");
    },
  });

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Search & Manage Admin</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="email"
          className="border p-2 w-full"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
          placeholder="Enter user email"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {userResult && (
        <div className="border p-4 rounded bg-gray-100">
          <p><strong>Email:</strong> {userResult.email}</p>
          <p><strong>Role:</strong> {userResult.role}</p>
          <p><strong>Created At:</strong> {new Date(userResult.createdAt).toLocaleDateString()}</p>

          {userResult.role === "admin" ? (
            <button
              onClick={() => removeAdminMutation.mutate()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Remove Admin
            </button>
          ) : (
            <button
              onClick={() => makeAdminMutation.mutate()}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Make Admin
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
