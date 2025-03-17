import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import UserDashboard from "../../../components/UserDashboard/UserDashboard";
import Footer from "../../../components/Footer/Footer";

const UserProfile = () => {
  return (
    <div className="bg-confirm_background w-screen h-screen overflow-x-hidden">
      <Navbar />
      <UserDashboard />
      <Footer />
    </div>
  );
};

export default UserProfile;
