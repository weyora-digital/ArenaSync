import React, { useState, useEffect } from "react";
import { fetchUpcomingEvents } from "../../helper/helper";
import EventCard from "./EventCard";
import { Toaster, toast } from "react-hot-toast";

const UpcomingChallenges = () => {
  const [events, setEvents] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const games = ["Apex Legends", "Call of Duty", "Fortnite"];
  const countries = ["USA", "UK", "Canada"];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await fetchUpcomingEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        toast.error("Failed to load events");
      }
    };
    fetchEvents();
  }, []);

  // Optionally, filter events by selectedGame and selectedCountry
  const filteredEvents = events.filter((event) => {
    return (
      (selectedGame ? event.gamename === selectedGame : true) &&
      (selectedCountry ? event.country === selectedCountry : true)
    );
  });

  return (
    <section className="flex flex-col bg-primary_bg pb-12 px-24">
      <>
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

          {/* Filters Row */}
          <div className="flex justify-start w-full md:justify-end items-center mb-6">
            {/* Game Filter */}
            <div className="w-full md:w-1/4 mr-4">
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
                className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.length ? (
            filteredEvents.map((event) => (
              <EventCard key={event.eventid} event={event} />
            ))
          ) : (
            <p className="text-gray-500">No Challenges Available</p>
          )}
        </div>
      </>
    </section>
  );
};

export default UpcomingChallenges;
