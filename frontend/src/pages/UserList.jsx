import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (filter = "") => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hospital-management-system-5-hh17.onrender.com/api/users${
          filter ? `?role=${filter}` : ""
        }`
      );
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Check backend or CORS settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>
        All Registered Users
      </h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => {
            setRole("all");
            fetchUsers();
          }}
        >
          All
        </button>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => {
            setRole("doctor");
            fetchUsers("doctor");
          }}
        >
          Doctors
        </button>
        <button
          onClick={() => {
            setRole("patient");
            fetchUsers("patient");
          }}
        >
          Patients
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Name
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {user.name}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {user.email}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {user.role}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
