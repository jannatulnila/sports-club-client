import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageAnnouncements = () => {
  const axiosSecure = useAxiosSecure();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', message: '' });

  const { data: announcements = [], refetch } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({ title: 'Delete?', icon: 'warning', showCancelButton: true });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/announcements/${id}`);
      Swal.fire('Deleted!', '', 'success');
      refetch();
    }
  };

  const handleEdit = (announcement) => {
    setEditing(announcement._id);
    setForm({ title: announcement.title, message: announcement.message });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axiosSecure.patch(`/announcements/${editing}`, form);
    setEditing(null);
    refetch();
    Swal.fire('Updated!', '', 'success');
  };

  return (
    <div className="p-6 max-w-4xl bg-black mx-auto space-y-4">
      <h2 className="text-2xl text-center font-bold">Manage Announcements</h2>

      {announcements.map((a) => (
        <div key={a._id} className="bg-base-200 p-4 rounded">
          {editing === a._id ? (
            <form onSubmit={handleUpdate} className="space-y-2">
              <input className="input input-bordered w-full" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <textarea className="textarea textarea-bordered w-full" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              <div className="flex gap-2">
                <button className="btn btn-success btn-sm" type="submit">Save</button>
                <button className="btn btn-secondary btn-sm" type="button" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <p>{a.message}</p>
              <div className="text-sm text-gray-400">Posted by {a.postedBy} on {new Date(a.createdAt).toLocaleDateString()}</div>
              <div className="mt-2 flex gap-2">
                <button className="btn btn-sm btn-info" onClick={() => handleEdit(a)}>Edit</button>
                <button className="btn btn-sm btn-error" onClick={() => handleDelete(a._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageAnnouncements;
