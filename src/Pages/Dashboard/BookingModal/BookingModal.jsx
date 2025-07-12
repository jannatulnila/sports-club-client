import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const BookingModal = ({ court, setSelectedCourt }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [date, setDate] = useState("");

  const handleSlotChange = (e) => {
    const value = e.target.value;
    setSelectedSlots(
      selectedSlots.includes(value)
        ? selectedSlots.filter((slot) => slot !== value)
        : [...selectedSlots, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || selectedSlots.length === 0) {
      return Swal.fire("Error", "Please select date and slots", "error");
    }

    const totalPrice = selectedSlots.length * court.pricePerSession;

    const bookingData = {
      courtId: court._id,
      courtName: court.name,
      courtType: court.type,
      image: court.image,
      email: user.email,
      price: totalPrice,
      slots: selectedSlots,
      date,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Booking request sent!", "success");
        setSelectedCourt(null);
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">
        <h2 className="text-xl font-semibold text-secondary mb-4">Book {court.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" value={court.name} readOnly className="input input-bordered w-full" />
          <input type="text" value={court.type} readOnly className="input input-bordered w-full" />
          <input type="number" value={court.pricePerSession} readOnly className="input input-bordered w-full" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <label className="font-semibold text-secondary">Select Slots:</label>
          <div className="grid grid-cols-2 gap-2">
            {court.slots.map((slot, idx) => (
              <label key={idx} className="flex items-center space-x-2 text-secondary">
                <input
                  type="checkbox"
                  value={slot}
                  checked={selectedSlots.includes(slot)}
                  onChange={handleSlotChange}
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-full mt-3">
            Submit Booking
          </button>
          <button type="button" onClick={() => setSelectedCourt(null)} className="btn w-full">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
