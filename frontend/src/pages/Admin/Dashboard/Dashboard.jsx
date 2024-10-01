import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard flex">
      < AdminSidebar/>
      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Welcome to Admin Dashboard</h1>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
