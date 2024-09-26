import React, { useState } from 'react';
import './Navbar.scss';
import logo from '../../assests/images/logo.png'
import SignupForm from '../SignUp/SignUp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faYoutube, faTwitch, faDiscord } from '@fortawesome/free-brands-svg-icons';  // Brand Icons


const Navbar = () => {

  const [isSignupModalOpen, setIsSignupModelOpen] = useState(false);

  const openSignupModal = () => setIsSignupModelOpen(true);
  const closeSignupModal = () => setIsSignupModelOpen(false);

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
          <li><a href="#" className="hover:text-gray-400">HOME</a></li>
          <li><a href="#" className="hover:text-gray-400">EVENTS</a></li>
          <li><a href="#" className="hover:text-gray-400">ORGANIZATIONS & CLANS</a></li>
          <li><a href="#" className="hover:text-gray-400">CHALLENGES</a></li>
        </ul>

        {/* Auth Links */}
        <div className="navbar-auth flex space-x-4">
        <button onClick={openSignupModal} className="btn signup-btn">Sign Up</button>
          <a href="#" className="btn login-btn">Login</a>
        </div>
        <SignupForm isOpen={isSignupModalOpen} onClose={closeSignupModal} />
      </nav>
    </header>
  );
};

export default Navbar;
