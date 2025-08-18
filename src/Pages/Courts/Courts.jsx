import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import BookingModal from "./BookingModal/BookingModal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Courts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(""); // asc or desc
  const itemsPerPage = 6;

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["allCourts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courts");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;

  // Sorting
  const sortedCourts = [...courts].sort((a, b) => {
    if (sortOrder === "asc") return a.pricePerSession - b.pricePerSession;
    if (sortOrder === "desc") return b.pricePerSession - a.pricePerSession;
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedCourts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCourts = sortedCourts.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-secondary">
        All Courts
      </h2>

      {/* Sorting */}
      <div className="flex justify-center mb-4">
        <select
          className="select select-bordered w-48 "
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Card View */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCourts.map((court) => (
          <div
            key={court._id}
            className="card bg-base-100 shadow-lg h-full flex flex-col"
          >
            <figure>
              <img
                src={court.image}
                alt={court.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between h-64">
              <div>
                <h2 className="card-title">{court.name}</h2>
                <p>
                  <strong>Type:</strong> {court.type}
                </p>
                <p>
                  <strong>Price:</strong> ${court.pricePerSession} / session
                </p>
                <label className="font-medium">Available Slots:</label>
                <select className="select select-bordered w-full">
                  {court.slots.map((slot, index) => (
                    <option key={index}>{slot}</option>
                  ))}
                </select>
              </div>
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
      </div>

      {/* Booking Modal */}
      {selectedCourt && (
        <BookingModal court={selectedCourt} setSelectedCourt={setSelectedCourt} />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Courts;
