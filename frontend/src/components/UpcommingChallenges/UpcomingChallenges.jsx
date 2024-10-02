import React, { useState } from "react";
// import './UpcomingChallenges.scss'; // For custom SCSS if needed

const UpcomingChallenges = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const games = ["Apex Legends", "Call of Duty", "Fortnite"];
  const countries = ["USA", "UK", "Canada"];

  return (
    <section className="upcoming-challenges flex flex-col bg-primary_bg pb-12 px-24">
      <div className="flex flex-row-2">
        <div className="flex justify-start w-full items-center mb-8">
          <h2 className="text-3xl font-bold text-primary_text mr-10">
            <span className="border-l-4 border-blue-500 pl-2">
              UPCOMING CHALLENGES
            </span>
          </h2>
          <a href="#" className="text-blue-500 hover:underline items-center">
            VIEW ALL CHALLENGES &rarr;
          </a>
        </div>

        <div className="flex justify-start w-full md:justify-end items-center mb-6">
          <div className="md:w-1/4 mr-4">
            <select
              className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              aria-label="Filter by Game"
            >
              <option value="">Filter by Game</option>
              {games.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/4">
            <select
              className="p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              aria-label="Filter by Country"
            >
              <option value="">Filter by Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Challenges Row */}

      {/* Bottom View All Challenges Link
        <div className="flex justify-end mt-6">
          <a href="#" className="text-blue-500 hover:underline">
            VIEW ALL CHALLENGES &rarr;
          </a>
        </div> */}

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
    </section>
  );
};

export default UpcomingChallenges;
