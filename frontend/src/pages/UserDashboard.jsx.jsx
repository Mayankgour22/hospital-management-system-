import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const user = JSON.parse(localStorage.getItem("user"));
  const patientId = user?._id || user?.id;


  const fetchAppointments = async () => {
    if (!patientId) {
      console.error("No patientId found in localStorage");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/appointments/patient/${patientId}`
      );
      setAppointments(res.data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to load appointments. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

 
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/cancel`);
      alert("Appointment cancelled successfully!");
      fetchAppointments();
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>My Appointments</h2>

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
                Doctor
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
                  {appt.doctorId?.name || "Unknown"}
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
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleCancel(appt._id)}
                    >
                      Cancel
                    </button>
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

export default UserDashboard;
