import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import UserList from "./pages/UserList.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import BookAppointment from "./pages/BookAppointment.jsx";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
    
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          backgroundColor: "#007bff",
          padding: "10px",
        }}
      >
        {!user ? (
          
          <>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Signup
            </Link>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
          </>
        ) : (
          
          <>
            {user.role === "doctor" && (
              <>
                <Link
                  to="/doctor-dashboard"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Doctor Dashboard
                </Link>
                <Link
                  to="/users"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  View Users
                </Link>
              </>
            )}

            {user.role === "user" && (
              <>
                <Link
                  to="/user-dashboard"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Patient Dashboard
                </Link>
                <Link
                  to="/book-appointment"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Book Appointment
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>

     
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRole="doctor">
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute allowedRole="user">
              <BookAppointment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
