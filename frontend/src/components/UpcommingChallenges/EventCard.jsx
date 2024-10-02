import React from 'react';
// import './EventCard.scss'; // Optional if you want custom SCSS

const EventCard = ({ event }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white event-card">
      <img
        src={`${event.image_path}`}
        // src={`http://127.0.0.1:5000/assets/IGE_Masters_South_Asia.jpg`}
        alt={event.gamename}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h3 className="text-xl font-bold mb-2">{event.gamename}</h3>
      <div className="flex items-center mb-4">
        <span className="text-gray-400 mr-2">Country:</span>
        <span className="font-medium">{event.country}</span>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-gray-400 mr-2">Organizer:</span>
        <span className="font-medium">{event.organizer}</span>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-gray-400 mr-2">Location:</span>
        <span className="font-medium">{event.location}</span>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-gray-400 mr-2">Date:</span>
        <span className="font-medium">{event.starting_date}</span>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-gray-400 mr-2">StartingTime:</span>
        <span className="font-medium">{event.starting_time}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-green-500">Event Ongoing</span>
        <span className="text-gray-400">{event.registration_count} Gamers registered</span>
      </div>
    </div>
  );
};

export default EventCard;
