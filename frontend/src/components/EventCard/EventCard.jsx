import React, { useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";

const EventCard = ({ event }) => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  console.log(
    currentDate,
    event.registration_closing,
    currentDate > event.registration_closing
  );

  return (
    <div className="bg-gray-700 w-80 rounded-lg shadow-sm shadow-gray-900 text-primary_text event-card">
      <img
        src={event.img_path}
        alt={event.gamename}
        className="w-full h-48 object-cover rounded-t-md"
      />
      <div className="bg-name_background p-4">
        <h3 className="flex items-center justify-start text-xl h-8 font-bold mb-2">
          {event.gamename}
        </h3>
      </div>
      <div className="grid grid-cols-2 justify-start items-center">
        <div className="flex items-center h-5 bg-country_background border-r-2 p-4 border-name_background">
          <span className="text-event_text">Country</span>
        </div>
        <div className="flex items-center bg-country_background h-5 p-4">
          <span className="flex font-normal justify-start">
            {event.country}
          </span>
        </div>
        <div className="flex flex-col bg-organizer_background border-r-2 px-4 justify-center h-20 border-name_background">
          <span className="text-event_text">Organizer</span>
          <span className="flex flex-wrap font-normal ">{event.organizer}</span>
        </div>
        <div className="flex flex-col bg-organizer_background px-4 justify-center h-20">
          <span className="text-event_text">Location</span>
          <span className="font-normal">{event.location}</span>
        </div>
        <div className="flex flex-col bg-country_background border-r-2 px-4 justify-center h-16 border-name_background">
          <span className="text-event_text mr-2">Date:</span>
          <span className="font-normal">{event.starting_date}</span>
        </div>
        <div className="flex flex-col bg-country_background px-4 justify-center h-16">
          <span className="text-event_text mr-2">StartingTime:</span>
          <span className="font-normal">{event.starting_time}</span>
        </div>
        <div className="flex flex-row items-center h-10 bg-name_background px-4">
          <MdGroups className="text-event_text" />
          <span className="ml-2 text-event_text text-xs">
            {event.registration_count} Gamers registered
          </span>
        </div>
        <div className="flex items-center justify-center h-10 bg-name_background">
          <span
            className={`text-xs font-bold text-event_text uppercase ${
              currentDate < event.registration_closing
                ? "text-blue_text"
                : currentDate < event.starting_date
                ? "text-green_text"
                : "Event Concluded"
            }`}
          >
            {currentDate < event.registration_closing
              ? "Register Now"
              : currentDate < event.starting_date
              ? "Event Ongoing"
              : "Event Concluded"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
