import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const doctorId = user?.id;

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://hospital-management-system-5-hh17.onrender.com/api/appointments/doctor/${doctorId}`
      );
      setAppointments(res.data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to load doctor appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [doctorId]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `https://hospital-management-system-5-hh17.onrender.com/api/appointments/${id}`,
        {
          status,
        }
      );
      alert(`Appointment ${status.toLowerCase()} successfully!`);
      fetchAppointments();
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update appointment status.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>
        Doctor Dashboard
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : appointments.length === 0 ? (
        <p style={{ textAlign: "center" }}>No appointments found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Patient
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Date
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Time
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Reason
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Status
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {appt.patientId?.name || "Unknown"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {appt.patientId?.email || "Unknown"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {new Date(appt.date).toLocaleDateString()}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {appt.time}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {appt.reason}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {appt.status}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {appt.status === "Pending" && (
                    <>
                      <button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                        onClick={() => handleStatusUpdate(appt._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleStatusUpdate(appt._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorDashboard;
