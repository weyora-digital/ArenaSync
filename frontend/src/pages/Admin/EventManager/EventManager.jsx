import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useAdminStore } from '../../store/store';
import { Toaster, toast } from 'react-hot-toast';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import { fetchAdminEvents, createAdminEvent, updateEvent, deleteEvent } from '../../../helper/adminhelper'; // Import helper functions

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    gamename: '',
    country: '',
    organizer: '',
    location: '',
    startingDate: '',
    endDate: '',
    startingTime: '',
    endTime: '',
    registrationClosing: ''
  });
  const [banner, setBanner] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const events = await fetchAdminEvents();
      setEvents(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    }
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleBannerChange = (e) => {
    setBanner(e.target.files[0]);
  };

  const handleCreateOrUpdateEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');

    try {
      if (editingEvent) {
        // Update existing event
        const response = await updateEvent(editingEvent.eventid, newEvent, token);
        toast.success('Event updated successfully');
        setEditingEvent(null); // Clear editing state
      } else {
        // Create new event
        const response = await createAdminEvent(newEvent, token);
        toast.success('Event created successfully');
      }
      setNewEvent({
        gamename: '',
        country: '',
        organizer: '',
        location: '',
        startingDate: '',
        endDate: '',
        startingTime: '',
        endTime: '',
        registrationClosing: ''
      });
      fetchEvents(); // Refresh event list
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    }
  };

  const handleEditEvent = (event) => {
    setNewEvent(event);
    setEditingEvent(event);
  };

  const handleDeleteEvent = async (eventId) => {
    const token = localStorage.getItem('admin_token');
    try {
      await deleteEvent(eventId, token);
      toast.success('Event deleted successfully');
      fetchEvents(); // Refresh event list
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="p-6 flex-grow">
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingEvent ? 'Update Event' : 'Create New Event'}
          </h2>
          <form onSubmit={handleCreateOrUpdateEvent} className="space-y-4">
            <input
              type="text"
              name="gamename"
              placeholder="Game Name"
              value={newEvent.gamename}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={newEvent.country}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              type="text"
              name="organizer"
              placeholder="Organizer"
              value={newEvent.organizer}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newEvent.location}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              type="date"
              name="startingDate"
              value={newEvent.startingDate}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              type="date"
              name="endDate"
              value={newEvent.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              type="time"
              name="startingTime"
              value={newEvent.startingTime}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              type="time"
              name="endTime"
              value={newEvent.endTime}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <input
              type="date"
              name="registrationClosing"
              value={newEvent.registrationClosing}
              onChange={handleInputChange}
              className="w-full p-2 border"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Available Events</h2>
          <ul>
            {events.map((event) => (
              <li key={event.eventid} className="mb-4">
                <p>{event.gamename}</p>
                <p>{event.country}</p>
                <button
                  onClick={() => handleEditEvent(event)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.eventid)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventManager;
