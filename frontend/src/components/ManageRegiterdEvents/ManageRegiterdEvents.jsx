import React, { useEffect, useState } from "react";
import {
  getRegisteredEvents,
  deleteRegisteredEvent,
} from "../../helper/helper";
import toast from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import RegisterEvent from "../RegisterEvent/RegisterEvent";

const ManageRegiterdEvents = () => {
  const [events, setEvents] = useState([]);
  const [item, setItem] = useState([]);
  const [isEventModalOpen, setIsEventModelOpen] = useState(false);

  const closeEventRegistrationModal = () => setIsEventModelOpen(false);

  const fetchEvents = async () => {
    try {
      const events = await getRegisteredEvents();
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdateEvent = (item) => {
    setItem(item);
    setIsEventModelOpen(true);
  };

  const handleDeleteEvent = async (registration_id) => {
    try {
      await deleteRegisteredEvent(registration_id);
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const tableHeading = [
    "Registration Id",
    "Game Name",
    "Country",
    "University Id",
    "Batch Id",
    "Phone Number",
    "Gender",
    "Date of Birth",
    "Action",
  ];

  const renderRows = (event) => {
    return event.map((item) => (
      <div
        key={item._id}
        className="grid grid-cols-9 h-16 items-center border-b-2 text-primary_text border-b-secondary_text text-sm"
      >
        <p className="text-center">{item.registration_id}</p>
        <p className="text-center">{item.gamename}</p>
        <p className="text-center">{item.country}</p>
        <p className="text-center">{item.university_id}</p>
        <p className="text-center">{item.batch_id}</p>
        <p className="text-center">{item.phone_number}</p>
        <p className="text-center">{item.gender}</p>
        <p className="text-center">
          {new Date(item.date_of_birth).toISOString().split("T")[0]}
        </p>
        <div className="justify-center flex gap-5">
          <MdOutlineEdit
            className="text-xl text-[#E1BE43] cursor-pointer"
            onClick={() => handleUpdateEvent(item)}
          />
          <RiDeleteBin6Line
            className="text-xl text-custom_red cursor-pointer"
            onClick={() => handleDeleteEvent(item.registration_id)}
          />
        </div>
      </div>
    ));
  };

  return (
    <>
      {events.length === 0 ? (
        <div className="text-primary_text italic pt-5 text-center">
          -- No events to display --
        </div>
      ) : (
        <>
          <div className="h-fit border-2 mt-4 rounded-lg border-event_text overflow-x-auto overflow-y-auto">
            {tableHeading.length > 0 && (
              <div
                className={`sticky top-0 grid grid-cols-9 h-16 items-center border-b-2 border-b-event_text font-bold`}
              >
                {tableHeading.map((heading, index) => (
                  <p
                    key={index}
                    className="text-center text-primary_text text-sm"
                  >
                    {heading}
                  </p>
                ))}
              </div>
            )}
            {events.length > 0 && renderRows(events)}
          </div>
          {isEventModalOpen && (
            <RegisterEvent
              isOpen={isEventModalOpen}
              onClose={closeEventRegistrationModal}
              fetchData={fetchEvents}
              item={item}
            />
          )}
        </>
      )}
    </>
  );
};

export default ManageRegiterdEvents;
