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
      <div className="flex justify-center mb-6">
        <select
          className="select select-bordered w-48"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Card View */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 lg:px-8 py-6 md:py-10">
        {currentCourts.map((court) => (
          <div
            key={court._id}
            className="bg-base-100 shadow-md rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <figure>
              <img
                src={court.image}
                alt={court.name}
                className="h-48 w-full object-cover"
              />
            </figure>

            {/* Card Body */}
            <div className="flex flex-col flex-1 p-4">
              <h2 className="text-lg font-semibold mb-2">{court.name}</h2>
              <p className="text-sm text-gray-300">
                <strong>Type:</strong> {court.type}
              </p>
              <p className="text-sm text-gray-300">
                <strong>Price:</strong> ${court.pricePerSession} / session
              </p>

              {/* Slots */}
              <label className="text-sm font-medium mt-2">Available Slots:</label>
              <select className="select select-bordered w-full mt-1">
                {court.slots.map((slot, index) => (
                  <option key={index}>{slot}</option>
                ))}
              </select>

              {/* Button stays at bottom */}
              <div className="mt-auto pt-4">
                <button
                  className="btn btn-primary w-full"
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
