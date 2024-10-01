import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../store/store'; // Zustand store for admin state

const AdminSidebar = () => {
  const navigate = useNavigate();
  const logoutAdmin = useAdminStore((state) => state.logoutAdmin); // Logout action from Zustand

  const handleLogout = () => {
    logoutAdmin();
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-sidebar w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {/* Navigation Links */}
      <ul className="flex-grow">
        <li>
          <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-600">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/events" className="block py-2 px-4 hover:bg-gray-600">
            Manage Events
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-600">
            Manage Users
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="block py-2 px-4 hover:bg-gray-600">
            Settings
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <button onClick={handleLogout} className="mt-auto bg-red-600 text-white py-2 w-full">
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
