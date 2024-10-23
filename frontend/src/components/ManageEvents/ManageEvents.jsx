import React, { useState } from "react";
import { fetchAdminEvents, deleteEvent } from "../../helper/adminhelper"; // Import helper functions
import TableRenderProp from "../RenderProp/TableRenderProp";
import toast from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddEvent from "../AddEvent/AddEvent";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [popUpAddEvent, setPopUpAddEvent] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const resetPage = async () => {
    setCurrentPage(0);
  };

  const fetchEvents = async () => {
    try {
      const events = await fetchAdminEvents();
      setEvents(events);
      setTotalElements(events.length);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    }
  };

  const handleClick = () => {
    setEditEvent(false);
    setPopUpAddEvent(!popUpAddEvent);
  };

  const tableHeading = [
    "Events Id",
    "Game Name",
    "Country",
    "Organizer",
    "Admin Id",
    "Location",
    <>
      Start Date <br /> Time
    </>,
    <>
      End Date <br /> Time
    </>,
    "Registration Closing Date",
    "Game Names",
    "Action",
  ];

  const handleUpdateEvent = (item) => {
    setEditEvent(true);
    setItem(item);
    setPopUpAddEvent(!popUpAddEvent);
  };

  const handleDeleteEvent = async (eventId) => {
    const token = localStorage.getItem("admin_token");
    console.log("clicked");
    try {
      await deleteEvent(eventId, token);
      toast.success("Event deleted successfully");

      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const renderRows = (event) => {
    return event.map((item, index) => (
      <div
        key={index}
        className={`grid grid-cols-11 h-16 items-center border-b-2 border-b-secondary_text text-sm`}
      >
        <p className="text-center">{item.eventid}</p>
        <p className="text-center">{item.gamename}</p>
        <p className="text-center">{item.country}</p>
        <p className="text-center">{item.organizer}</p>
        <p className="text-center">{item.adminid}</p>
        <p className="text-center">{item.location}</p>
        <p className="text-center">
          {item.starting_date} <br /> {item.starting_time}
        </p>
        <p className="text-center">
          {item.end_date} <br /> {item.end_time}
        </p>
        <p className="text-center">{item.registration_closing}</p>
        <p className="text-center">{item.game_names.join(" , ")}</p>
        <div className="justify-center flex gap-5">
          <MdOutlineEdit
            className="text-xl text-[#E1BE43] cursor-pointer"
            onClick={() => handleUpdateEvent(item)}
          />
          <RiDeleteBin6Line
            className="text-xl text-custom_red cursor-pointer"
            onClick={() => handleDeleteEvent(item.eventid)}
          />
        </div>
      </div>
    ));
  };

  return (
    <div>
      <TableRenderProp
        tableHeading={tableHeading}
        render={renderRows}
        handleClick={handleClick}
        heading={"Event Details"}
        buttonName={"New Event"}
        url={"http://127.0.0.1:5002/event/events"}
        pageType={"Upcoming Challenges"}
        fetchEvents={fetchEvents}
        events={events}
        totalElements={totalElements}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {popUpAddEvent && (
        <AddEvent
          onClose={handleClick}
          editEvent={editEvent}
          item={item}
          fetchEvents={fetchEvents}
          resetPage={resetPage}
        />
      )}
    </div>
  );
};

export default ManageEvents;
