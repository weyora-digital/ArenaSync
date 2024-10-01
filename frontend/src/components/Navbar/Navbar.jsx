import React, { useState } from 'react';
import './Navbar.scss';
import logo from '../../assests/images/logo.png';
import SignupForm from '../SignUp/SignUp';
import LoginForm from '../SignIn/SignIn';
import { useAuthStore } from '../../store/store'; // Zustand store for auth state
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube, faTwitch, faDiscord } from '@fortawesome/free-brands-svg-icons';  // Brand Icons

const Navbar = () => {
  const [isSignupModalOpen, setIsSignupModelOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModelOpen] = useState(false);
  const { auth, logout } = useAuthStore(); // Access Zustand store

  const openSignupModal = () => setIsSignupModelOpen(true);
  const closeSignupModal = () => setIsSignupModelOpen(false);

  const openLoginModal = () => setIsLoginModelOpen(true);
  const closeLoginModal = () => setIsLoginModelOpen(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear auth state in Zustand store
    localStorage.removeItem('token'); // Optionally clear token from localStorage
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <header className="navbar">
      {/* Top Section with Social Media Links */}
      <div className="navbar-top flex justify-between items-center py-2 px-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm">Follow Us</span>
          <a href="#"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
          <a href="#"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
          <a href="#"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
          <a href="#"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
          <a href="#"><FontAwesomeIcon icon={faTwitch} size="lg" /></a>
          <a href="#"><FontAwesomeIcon icon={faDiscord} size="lg" /></a>
        </div>
        <span className="navbar-welcome text-sm">Welcome to InGame eSports Platform!</span> 
      </div>

      {/* Bottom Section with Logo, Nav Links, and Login/SignUp */}
      <nav className="navbar-bottom flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={logo} alt="InGame Esports Logo" className="w-20" />
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links flex space-x-8">
          <li><Link to="/user/home" className="hover:text-gray-400">HOME</Link></li>
          <li><Link to="/events" className="hover:text-gray-400">EVENTS</Link></li>
          <li><Link to="/organizations" className="hover:text-gray-400">ORGANIZATIONS & CLANS</Link></li>
          <li><Link to="/challenges" className="hover:text-gray-400">CHALLENGES</Link></li>
        </ul>

        {/* Auth Links */}
        <div className="navbar-auth flex space-x-4">
          {auth.active ? (
            <>
              {/* Show Profile and Logout buttons if the user is logged in */}
              <Link to="/profile" className="btn profile-btn">Profile</Link>
              <button onClick={handleLogout} className="btn logout-btn">Logout</button>
            </>
          ) : (
            <>
              {/* Show Signup and Login buttons if the user is not logged in */}
              <button onClick={openSignupModal} className="btn signup-btn">Sign Up</button>
              <button onClick={openLoginModal} className="btn login-btn">Login</button>
            </>
          )}
        </div>

        {/* Signup Modal */}
        <SignupForm isOpen={isSignupModalOpen} onClose={closeSignupModal} openLoginModal={openLoginModal} /> {/* Pass openLoginModal */}

        {/* Login Modal */}
        <LoginForm isOpen={isLoginModalOpen} onClose={closeLoginModal} openSignupModal={openSignupModal} /> {/* Pass openSignupModal */}
      </nav>
    </header>
  );
};

export default Navbar;
