import { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';

const MakeAnnouncement = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postedBy = user.email; // You can fetch from useAuth()
        const res = await axiosSecure.post('/announcements', { title, message, postedBy });
        if (res.data.insertedId) {
            Swal.fire('Success', 'Announcement added', 'success');
            setTitle('');
            setMessage('');
        }
    };

    return (
       <div>
        <h2 className="text-2xl font-bold text-secondary text-center mb-4">Make Announcement</h2>
         <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-base-200 rounded-lg">
            <input
                className="input input-bordered w-full"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <button type="submit" className="btn btn-primary w-full">Add Announcement</button>
        </form>
       </div>
    );
};

export default MakeAnnouncement;
