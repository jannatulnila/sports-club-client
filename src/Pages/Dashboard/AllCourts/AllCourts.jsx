import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import BookingModal from "../BookingModal/BookingModal";

const AllCourts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState(null);

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["allCourts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courts");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courts.map((court) => (
        <div key={court._id} className="card bg-base-100 shadow-lg">
          <figure><img src={court.image} alt={court.name} className="h-48 w-full object-cover" /></figure>
          <div className="card-body">
            <h2 className="card-title">{court.name}</h2>
            <p><strong>Type:</strong> {court.type}</p>
            <p><strong>Price:</strong> ${court.pricePerSession} / session</p>
            <label htmlFor="slot" className="font-medium">Available Slots:</label>
            <select className="select select-bordered w-full">
              {court.slots.map((slot, index) => (
                <option key={index}>{slot}</option>
              ))}
            </select>
            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                if (!user) {
                  navigate("/login");
                } else {
                  setSelectedCourt(court);
                }
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
      {selectedCourt && (
        <BookingModal
          court={selectedCourt}
          setSelectedCourt={setSelectedCourt}
        />
      )}
    </div>
  );
};

export default AllCourts;
