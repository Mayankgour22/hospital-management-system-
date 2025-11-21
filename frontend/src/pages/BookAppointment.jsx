import React, { useEffect, useState } from "react";
import axios from "axios";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "https://hospital-management-system-5-hh17.onrender.com/api/users"
        );
        const doctorList = res.data.data.filter((u) => u.role === "doctor");
        setDoctors(doctorList);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://hospital-management-system-5-hh17.onrender.com/api/appointments",
        {
          patientId: user.id,
          doctorId: selectedDoctor,
          date,
          time,
          reason,
        }
      );
      alert("Appointment booked successfully!");
      setSelectedDoctor("");
      setDate("");
      setTime("");
      setReason("");
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h3 style={{ textAlign: "center", color: "#007bff" }}>
        Book Appointment
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor:</label>
          <select
            className="form-control"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.email})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Date:</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Time:</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Reason:</label>
          <textarea
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3 w-100">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
