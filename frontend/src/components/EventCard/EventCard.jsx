import React, { useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { fetchCountryFlag } from "../../helper/helper";
import toast from "react-hot-toast";

const EventCard = ({ event }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [countryFlag, setCountryFlag] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);

    const fetchData = async () => {
      try {
        const [countryFlag] = await Promise.all([
          fetchCountryFlag(event.country),
        ]);
        setCountryFlag(countryFlag);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  const handleClicked = () => {
    console.log("Clicked");
  };

  return (
    <div className="bg-gray-700 w-80 rounded-lg shadow-sm shadow-gray-900 text-primary_text event-card">
      <img
        src={event.img_path}
        alt={event.gamename}
        className="w-full h-48 object-cover rounded-t-md hover:opacity-80"
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
            <img
              src={countryFlag}
              style={{ width: "15x", height: "10px" }}
              alt="Country Flag"
            />
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
            className={`text-xs font-bold uppercase ${
              currentDate < event.registration_closing
                ? "text-blue_text cursor-pointer"
                : currentDate < event.end_date
                ? "text-green_text cursor-default"
                : "text-event_text cursor-default"
            }`}
            style={
              currentDate < event.registration_closing
                ? {
                    textShadow:
                      "0 0 10px #234C63, 0 0 10px #234C63, 0 0 10px #234C63, 0 0 10px #234C63",
                  }
                : currentDate < event.end_date
                ? {
                    textShadow:
                      "0 0 10px #2C4D09, 0 0 10px #2C4D09, 0 0 10px #2C4D09, 0 0 10px #2C4D09",
                  }
                : {}
            }
            onClick={
              currentDate < event.registration_closing
                ? handleClicked
                : null
            }
          >
            {currentDate < event.registration_closing
              ? "Register Now"
              : currentDate < event.end_date
              ? "Event Ongoing"
              : "Event Concluded"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
