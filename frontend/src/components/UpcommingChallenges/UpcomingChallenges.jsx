import React, { useState, useEffect } from "react";
import { fetchUpcomingEvents } from "../../helper/helper";
import EventCard from "./EventCard";
import './UpcomingChallenges.scss'; // For custom SCSS if needed
import { Toaster, toast } from "react-hot-toast";

const UpcomingChallenges = () => {
  const [events, setEvents] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await fetchUpcomingEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        toast.error('Failed to load events');
      }
    };
    fetchEvents();
  }, []);

  // Optionally, filter events by selectedGame and selectedCountry
  const filteredEvents = events.filter(event => {
    return (
      (selectedGame ? event.gamename === selectedGame : true) &&
      (selectedCountry ? event.country === selectedCountry : true)
    );
  });

  return (
    <section className="upcoming-challenges py-12">
      <Toaster position="top-center" reverseOrder={false} />
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
          {filteredEvents.length ? (
            filteredEvents.map((event) => (
              <EventCard key={event.eventid} event={event} />
            ))
          ) : (
            <p className="text-gray-500">No Challenges Available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingChallenges;
