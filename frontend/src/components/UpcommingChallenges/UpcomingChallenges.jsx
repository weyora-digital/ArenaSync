import React, { useState } from "react";
import './UpcomingChallenges.scss'; // For custom SCSS if needed

const UpcomingChallenges = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <section className="upcoming-challenges py-12">
      <div className="container mx-auto px-4">
        
        {/* Title and View All Link Row */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            <span className="text-blue-500 border-l-4 border-blue-500 pl-2">
              UPCOMING CHALLENGES
            </span>
          </h2>
          <a href="#" className="text-blue-500 hover:underline">
            VIEW ALL CHALLENGES &rarr;
          </a>
        </div>

        {/* Filters Row */}
        <div className="flex justify-start md:justify-end items-center mb-6">
          {/* Game Filter */}
          <div className="w-full md:w-1/4 mr-4">
            <select
              className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
            >
              <option value="">Filter by Game</option>
              <option value="Apex Legends">Apex Legends</option>
              <option value="Call of Duty">Call of Duty</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Country Filter */}
          <div className="w-full md:w-1/4">
            <select
              className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Filter by Country</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        {/* Challenges Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Today's Challenges */}
          <div>
            <h3 className="text-xl text-blue-500 mb-4">TODAY'S CHALLENGES</h3>
            {/* Placeholder text if no challenges */}
            <p className="text-gray-500">No Challenges Available</p>
          </div>

          {/* Tomorrow's Challenges */}
          <div>
            <h3 className="text-xl text-blue-500 mb-4">TOMORROW'S CHALLENGES</h3>
            {/* Placeholder text if no challenges */}
            <p className="text-gray-500">No Challenges Available</p>
          </div>
        </div>

        {/* Bottom View All Challenges Link
        <div className="flex justify-end mt-6">
          <a href="#" className="text-blue-500 hover:underline">
            VIEW ALL CHALLENGES &rarr;
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default UpcomingChallenges;
