import React, { useEffect, useContext } from "react";
// User Pages
import Navbar from "./components/user/Navbar";
import Home from "./components/user/Home";
import Information from "./components/user/Information";
import Contact from "./components/user/Contact";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ScholarshipTypes from "./components/user/ScholarshipTypes";
import ViewUserScholarships from "./components/user/ViewUserScholarships";
import ApplicationForm from "./components/user/ApplicationForm";
import UserDashboard from "./components/user/UserDashboard";
import MeritBased from "./components/user/MeritBased";
import NeedBased from "./components/user/NeedBased";
import ResearchBased from "./components/user/ResearchBased";
import InternatinalBased from "./components/user/InternatinalBased";
import MinorityBased from "./components/user/MinorityBased";
// Admin Pages
import AddScholarship from "./components/admin/AddScholarship";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/Login";
import AdminProfile from "./components/admin/AdminProfile";
import PreviousApplicationDetails from "./components/admin/PreviousApplicationDetails";
import StudentDetails from "./components/admin/StudentDetails";
import UpdateScholarship from "./components/admin/UpdateScholarship";
import ViewScholarships from "./components/admin/ViewScholarships";

import { UserProvider, UserContext } from "./context/auth";

// Animation on Scroll
import AOS from "aos";
import "aos/dist/aos.css";
// Routing
import { Route, Routes, Navigate } from "react-router-dom";

// Protect admin routes
const AdminRoute = ({ children }) => {
  // const { adminLoggedIn } = useContext(UserContext);
  const adminLoggedInData = localStorage.getItem("adminLoggedIn");
  if (adminLoggedInData) {
    return children;
  } else {
    return <Navigate to="/admin_login" replace />;
  }
};

// Protect user routes
const UserRoute = ({ children }) => {
  // const { loggedIn } = useContext(UserContext);
  const loggedInData = localStorage.getItem("loggedIn");
  if (loggedInData) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const App = () => {
  useEffect(() => {
    document.title = "Edu-Kaliyan";
    AOS.init();
  }, []);

  return (
    <UserProvider>
      <Navbar />
      <Routes>
        {/* Public/User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/scholarship_information" element={<Information />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scholarships" element={<ScholarshipTypes />} />
        <Route path="/view-scholarships" element={<ViewUserScholarships />} />

        {/* User Protected Routes */}
        <Route
          path="/application-form/:id"
          element={
            <UserRoute>
              <ApplicationForm />
            </UserRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />
        <Route path="/merit-based-scholarships" element={<MeritBased />} />
        <Route path="/need-based-scholarships" element={<NeedBased />} />
        <Route
          path="/international-based-scholarships"
          element={<InternatinalBased />}
        />
        <Route
          path="/research-based-scholarships"
          element={<ResearchBased />}
        />
        <Route
          path="/minority-based-scholarships"
          element={<MinorityBased />}
        />

        {/* Admin Protected Routes */}
        <Route
          path="/add-scholarship"
          element={
            <AdminRoute>
              <AddScholarship />
            </AdminRoute>
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/adminProfile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route
          path="/adminDashboard/studentDetails"
          element={
            <AdminRoute>
              <StudentDetails />
            </AdminRoute>
          }
        />
        <Route
          path="/adminDashboard/previousApplicationsDetails"
          element={
            <AdminRoute>
              <PreviousApplicationDetails />
            </AdminRoute>
          }
        />
        <Route
          path="/update-scholarship/:id"
          element={
            <AdminRoute>
              <UpdateScholarship />
            </AdminRoute>
          }
        />
        <Route
          path="/viewScholarships"
          element={
            <AdminRoute>
              <ViewScholarships />
            </AdminRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
};

export default App;
