import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import TaskDashboard from "./pages/TaskDashboard";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import SalesDashboard from "./pages/SalesDashboard";


function App() {
 
  return (
    <>
      <Navbar />

      <Routes>
        {/* Redirect root ("/") to login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Role Based Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            <PrivateRoute>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales-dashboard"
          element={
            <PrivateRoute>
              <SalesDashboard />
            </PrivateRoute>
          }
        />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
