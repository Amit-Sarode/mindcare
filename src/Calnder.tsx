import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, MapPin, Edit2, Trash2, X, Plus } from 'lucide-react';

const API_BASE_URL = 'http://localhost:4000/api/events';

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    hasZoom: false
  });

  // Fetch all events from API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const getEventsForDate = (date) => {
    return events.filter(event => 
      isSameDay(new Date(event.startTime), date)
    ).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: selectedDate.toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      location: '',
      hasZoom: false
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    const startDate = new Date(event.startTime);
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      date: startDate.toISOString().split('T')[0],
      startTime: startDate.toTimeString().slice(0, 5),
      endTime: new Date(event.endTime).toTimeString().slice(0, 5),
      location: event.location || '',
      hasZoom: !!event.zoomJoinUrl
    });
    setShowModal(true);
  };

  // CREATE Event
  const createEvent = async (eventData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      await fetchEvents(); // Refresh events list
      return true;
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
      return false;
    }
  };

  // UPDATE Event
  const updateEvent = async (id, eventData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      await fetchEvents(); // Refresh events list
      return true;
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
      return false;
    }
  };

  // DELETE Event
  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      await fetchEvents(); // Refresh events list
      alert('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const handleSaveEvent = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    const eventDate = new Date(formData.date);
    const [startHour, startMin] = formData.startTime.split(':');
    const [endHour, endMin] = formData.endTime.split(':');
    
    const startTime = new Date(eventDate);
    startTime.setHours(parseInt(startHour), parseInt(startMin));
    
    const endTime = new Date(eventDate);
    endTime.setHours(parseInt(endHour), parseInt(endMin));

    const eventPayload = {
      title: formData.title,
      description: formData.description,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      location: formData.location || (formData.hasZoom ? 'Online (Zoom)' : ''),
    };

    let success = false;
    if (editingEvent) {
      // Update existing event
      success = await updateEvent(editingEvent._id, eventPayload);
    } else {
      // Create new event
      success = await createEvent(eventPayload);
    }

    if (success) {
      setShowModal(false);
      alert(editingEvent ? '✅ Event updated successfully!' : '✅ Event created successfully!');
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    const today = new Date();

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = isSameDay(date, today);
      const isSelected = isSameDay(date, selectedDate);

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {dayEvents.length > 0 && (
            <div className="event-dots">
              {dayEvents.slice(0, 3).map((_, i) => (
                <div key={i} className="dot"></div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const selectedDayEvents = getEventsForDate(selectedDate);

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Google Sans', 'Roboto', Arial, sans-serif;
          background: #fff;
        }

        .app {
          min-height: 100vh;
          background: #fff;
          padding: 24px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 22px;
          font-weight: 400;
          color: #3c4043;
        }

        .logo svg {
          width: 40px;
          height: 40px;
          color: #1a73e8;
        }

        .create-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: none;
          padding: 12px 24px;
          border-radius: 24px;
          box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #3c4043;
          transition: all 0.2s;
        }

        .create-btn:hover {
          box-shadow: 0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15);
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
        }

        .calendar-section {
          background: white;
          border: 1px solid #dadce0;
          border-radius: 8px;
          padding: 24px;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .month-title {
          font-size: 22px;
          font-weight: 400;
          color: #3c4043;
        }

        .nav-buttons {
          display: flex;
          gap: 8px;
        }

        .nav-btn {
          background: none;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5f6368;
          transition: background 0.2s;
        }

        .nav-btn:hover {
          background: #f1f3f4;
        }

        .weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 8px;
        }

        .weekday {
          text-align: center;
          font-size: 11px;
          font-weight: 500;
          color: #70757a;
          padding: 8px;
          text-transform: uppercase;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }

        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 8px;
          cursor: pointer;
          border-radius: 50%;
          position: relative;
          transition: background 0.2s;
        }

        .calendar-day:hover:not(.empty) {
          background: #f1f3f4;
        }

        .calendar-day.today .day-number {
          background: #1a73e8;
          color: white;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 500;
        }

        .calendar-day.selected {
          background: #e8f0fe;
        }

        .day-number {
          font-size: 12px;
          color: #3c4043;
          font-weight: 400;
        }

        .event-dots {
          display: flex;
          gap: 2px;
          margin-top: 4px;
        }

        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #1a73e8;
        }

        .sidebar {
          background: white;
          border: 1px solid #dadce0;
          border-radius: 8px;
          padding: 24px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }

        .sidebar-header {
          margin-bottom: 20px;
        }

        .selected-date {
          font-size: 11px;
          text-transform: uppercase;
          color: #70757a;
          font-weight: 500;
          letter-spacing: 0.8px;
          margin-bottom: 4px;
        }

        .date-title {
          font-size: 22px;
          font-weight: 400;
          
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .no-events {
          text-align: center;
          padding: 48px 0;
          color: #5f6368;
        }

        .no-events-icon {
          font-size: 48px;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        .loading {
          text-align: center;
          padding: 48px 0;
          color: #5f6368;
          font-size: 14px;
        }

        .event-card {
          background: white;
          border: 1px solid #dadce0;
          border-left: 4px solid #1a73e8;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s;
        }

        .event-card:hover {
          box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
        }

        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .event-title {
          font-size: 14px;
          font-weight: 500;
        
          margin-bottom: 4px;
        }

        .event-description {
          font-size: 13px;
          color: #5f6368;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .event-actions {
          display: flex;
          gap: 4px;
        }

        .icon-btn {
          background: none;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5f6368;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #f1f3f4;
        }

        .icon-btn.delete:hover {
          color: #d93025;
        }

        .event-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          color: #5f6368;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .meta-item svg {
          width: 14px;
          height: 14px;
        }

        .zoom-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #1a73e8;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          margin-top: 8px;
          transition: background 0.2s;
        }

        .zoom-btn:hover {
          background: #1765cc;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 24px 24px 16px;
          border-bottom: 1px solid #e8eaed;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 400;
          color: #3c4043;
        }

        .close-btn {
          background: none;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5f6368;
          transition: background 0.2s;
        }

        .close-btn:hover {
          background: #f1f3f4;
        }

        .modal-body {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          color: #5f6368;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .form-input,
        .form-textarea {
        background-color: #ffffff;
          width: 100%;
          padding: 12px;
          border: 1px solid #dadce0;
          border-radius: 4px;
          font-size: 14px;
          font-family: inherit;
          color: #3c4043;
          transition: border 0.2s;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #1a73e8;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .time-inputs {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .time-inputs input {
          flex: 1;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e8eaed;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .btn {
          padding: 10px 24px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary {
          background: white;
          color: #1a73e8;
        }

        .btn-secondary:hover {
          background: #f1f3f4;
        }

        .btn-primary {
          background: #1a73e8;
          color: white;
        }

        .btn-primary:hover {
          background: #1765cc;
          box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
        }

        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <div className="logo">
            <Calendar />
            <span>Calendar</span>
          </div>
          <button className="create-btn" onClick={openAddModal}>
            <Plus size={20} />
            Create
          </button>
        </div>

        <div className="main-content">
          <div className="calendar-section">
            <div className="calendar-header">
              <div className="month-title">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <div className="nav-buttons">
                <button className="nav-btn" onClick={handlePrevMonth}>‹</button>
                <button className="nav-btn" onClick={handleNextMonth}>›</button>
              </div>
            </div>

            <div className="weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>

            <div className="calendar-grid">
              {renderCalendar()}
            </div>
          </div>

          <div className="sidebar">
            <div className="sidebar-header">
              <div className="selected-date">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}
              </div>
              <div className="date-title">{formatDate(selectedDate)}</div>
            </div>

            <div className="events-list">
              {loading ? (
                <div className="loading">Loading events...</div>
              ) : selectedDayEvents.length === 0 ? (
                <div className="no-events">
                  <div className="no-events-icon">📅</div>
                  <div>No events scheduled</div>
                </div>
              ) : (
                selectedDayEvents.map(event => (
                  <div key={event._id} className="event-card">
                    <div className="event-header">
                      <div>
                        <div className="event-title">{event.title}</div>
                        {event.description && (
                          <div className="event-description">{event.description}</div>
                        )}
                      </div>
                      <div className="event-actions">
                        <button className="icon-btn" onClick={() => openEditModal(event)} title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className="icon-btn delete" onClick={() => deleteEvent(event._id)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="event-meta">
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                      </div>
                      {event.location && (
                        <div className="meta-item">
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    {event.zoomJoinUrl && (
                      <a href={event.zoomJoinUrl} target="_blank" rel="noopener noreferrer" className="zoom-btn">
                        <Video size={14} />
                        Join Zoom Meeting
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                {editingEvent ? 'Edit Event' : 'Create Event'}
              </div>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Add title"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time *</label>
                <div className="time-inputs">
                  <input
                    type="time"
                    className="form-input"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                  <span>to</span>
                  <input
                    type="time"
                    className="form-input"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add description"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Add location"
                />
              </div>

              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="zoom"
                    checked={formData.hasZoom}
                    onChange={(e) => setFormData({ ...formData, hasZoom: e.target.checked })}
                  />
                  <label htmlFor="zoom" className="form-label" style={{ marginBottom: 0 }}>
                    Add Zoom meeting (will be generated by server)
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveEvent}>
                {editingEvent ? 'Save Changes' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarApp;