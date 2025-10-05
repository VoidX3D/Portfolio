import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventText, setEventText] = useState('');
  const [eventTime, setEventTime] = useState('09:00');
  const [eventCategory, setEventCategory] = useState('personal');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // US Federal Holidays 2024-2026
  const holidays = {
    '2025-01-01': 'New Year\'s Day',
    '2025-01-20': 'Martin Luther King Jr. Day',
    '2025-02-17': 'Presidents\' Day',
    '2025-05-26': 'Memorial Day',
    '2025-06-19': 'Juneteenth',
    '2025-07-04': 'Independence Day',
    '2025-09-01': 'Labor Day',
    '2025-10-13': 'Columbus Day',
    '2025-11-11': 'Veterans Day',
    '2025-11-27': 'Thanksgiving',
    '2025-12-25': 'Christmas Day',
    '2024-01-01': 'New Year\'s Day',
    '2024-01-15': 'Martin Luther King Jr. Day',
    '2024-02-19': 'Presidents\' Day',
    '2024-05-27': 'Memorial Day',
    '2024-06-19': 'Juneteenth',
    '2024-07-04': 'Independence Day',
    '2024-09-02': 'Labor Day',
    '2024-10-14': 'Columbus Day',
    '2024-11-11': 'Veterans Day',
    '2024-11-28': 'Thanksgiving',
    '2024-12-25': 'Christmas Day',
    '2026-01-01': 'New Year\'s Day',
    '2026-01-19': 'Martin Luther King Jr. Day',
    '2026-02-16': 'Presidents\' Day',
    '2026-05-25': 'Memorial Day',
    '2026-06-19': 'Juneteenth',
    '2026-07-03': 'Independence Day (Observed)',
    '2026-09-07': 'Labor Day',
    '2026-10-12': 'Columbus Day',
    '2026-11-11': 'Veterans Day',
    '2026-11-26': 'Thanksgiving',
    '2026-12-25': 'Christmas Day'
  };

  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('ubuntu_calendar_events');
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    } catch (e) {
      console.error('Error loading events:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ubuntu_calendar_events', JSON.stringify(events));
    } catch (e) {
      console.error('Error saving events:', e);
    }
  }, [events]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const jumpToDate = () => {
    const input = prompt('Enter date (YYYY-MM-DD):');
    if (input) {
      const date = new Date(input);
      if (!isNaN(date.getTime())) {
        setCurrentDate(date);
        setSelectedDate(date);
      }
    }
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleAddEvent = () => {
    if (eventText.trim()) {
      const dateKey = formatDateKey(selectedDate);
      const newEvent = {
        text: eventText,
        time: eventTime,
        category: eventCategory,
        id: Date.now()
      };

      setEvents(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent]
      }));

      setEventText('');
      setEventTime('09:00');
      setEventCategory('personal');
      setShowEventModal(false);
    }
  };

  const handleDeleteEvent = (dateKey, eventId) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(e => e.id !== eventId)
    }));
  };

  const getFilteredEvents = (dateKey) => {
    const dayEvents = events[dateKey] || [];
    if (filterCategory === 'all') return dayEvents;
    return dayEvents.filter(e => e.category === filterCategory);
  };

  const searchEvents = () => {
    if (!searchQuery.trim()) return [];
    const results = [];
    Object.keys(events).forEach(dateKey => {
      events[dateKey].forEach(event => {
        if (event.text.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({ ...event, date: dateKey });
        }
      });
    });
    return results;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() && 
                           currentDate.getFullYear() === today.getFullYear();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = formatDateKey(date);
      const isToday = isCurrentMonth && day === today.getDate();
      const isSelected = selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentDate.getMonth() &&
                        selectedDate.getFullYear() === currentDate.getFullYear();
      const dayEvents = getFilteredEvents(dateKey);
      const hasEvents = dayEvents.length > 0;
      const holiday = holidays[dateKey];
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasEvents ? 'has-events' : ''} ${holiday ? 'holiday' : ''} ${isWeekend ? 'weekend' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasEvents && <div className="event-dots">
            {dayEvents.slice(0, 3).map((_, i) => <span key={i} className="dot"></span>)}
          </div>}
        </div>
      );
    }

    return days;
  };

  const renderEvents = () => {
    const dateKey = formatDateKey(selectedDate);
    const dayEvents = getFilteredEvents(dateKey);
    const holiday = holidays[dateKey];

    return (
      <div className="events-panel">
        <div className="events-header">
          <div className="date-title">
            <h3>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </h3>
            {holiday && (
              <div className="holiday-pill">
                <span className="holiday-icon">🎉</span>
                {holiday}
              </div>
            )}
          </div>
          <button className="add-event-btn" onClick={() => setShowEventModal(true)}>
            <span className="plus-icon">+</span> Add Event
          </button>
        </div>
        
        <div className="events-list">
          {dayEvents.length === 0 && !holiday ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <p>No events scheduled</p>
              <span>Click "Add Event" to create one</span>
            </div>
          ) : (
            <>
              {holiday && dayEvents.length === 0 && (
                <div className="holiday-only-message">
                  <span className="celebration-icon">🎊</span>
                  <p>It's {holiday}!</p>
                </div>
              )}
              {dayEvents.sort((a, b) => a.time.localeCompare(b.time)).map(event => (
                <div key={event.id} className={`event-card category-${event.category}`}>
                  <div className="event-header">
                    <span className="event-time">{event.time}</span>
                    <span className={`category-badge ${event.category}`}>{event.category}</span>
                  </div>
                  <div className="event-text">{event.text}</div>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteEvent(dateKey, event.id)}
                    title="Delete event"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  };

  const renderSearchResults = () => {
    const results = searchEvents();
    return (
      <div className="search-results">
        <h4>Search Results ({results.length})</h4>
        {results.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>No events found</p>
          </div>
        ) : (
          results.map(event => (
            <div key={`${event.date}-${event.id}`} className={`search-result-card category-${event.category}`}>
              <div className="result-date">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              <div className="result-content">
                <span className="result-time">{event.time}</span>
                <span className="result-text">{event.text}</span>
                <span className={`category-badge ${event.category}`}>{event.category}</span>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <style>{`
        .calendar-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          overflow: hidden;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
        }

        .calendar-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .header-controls {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .nav-btn, .today-btn, .jump-btn {
          background: #fff;
          border: 1px solid #d1d5db;
          color: #374151;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .nav-btn {
          padding: 8px 12px;
        }

        .nav-btn:hover, .today-btn:hover, .jump-btn:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .toolbar {
          display: flex;
          gap: 16px;
          padding: 16px 24px;
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          flex-wrap: wrap;
          align-items: center;
        }

        .filter-group {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .filter-group label {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #fff;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-box {
          display: flex;
          gap: 8px;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          flex: 1;
          padding: 8px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-btn {
          padding: 8px 16px;
          background: #3b82f6;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .search-btn:hover {
          background: #2563eb;
        }

        .calendar-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .calendar-grid-container {
          flex: 2;
          display: flex;
          flex-direction: column;
          padding: 24px;
          overflow: auto;
          background: #fafafa;
        }

        .day-headers {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-bottom: 8px;
        }

        .day-header {
          text-align: center;
          font-weight: 600;
          color: #6b7280;
          padding: 12px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          flex: 1;
        }

        .calendar-day {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          position: relative;
          min-height: 70px;
          padding: 8px;
        }

        .calendar-day.empty {
          cursor: default;
          background: transparent;
          border-color: transparent;
        }

        .calendar-day:not(.empty):hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .calendar-day.today {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #fff;
          border-color: #3b82f6;
          font-weight: 600;
        }

        .calendar-day.selected {
          border-color: #3b82f6;
          border-width: 2px;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .calendar-day.holiday {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-color: #f59e0b;
        }

        .calendar-day.holiday.today {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #fff;
        }

        .calendar-day.weekend {
          background: #f9fafb;
        }

        .day-number {
          font-size: 16px;
          font-weight: 500;
        }

        .event-dots {
          display: flex;
          gap: 3px;
          margin-top: 4px;
        }

        .dot {
          width: 5px;
          height: 5px;
          background: #3b82f6;
          border-radius: 50%;
        }

        .calendar-day.today .dot {
          background: #fff;
        }

        .events-panel {
          flex: 1;
          min-width: 320px;
          max-width: 400px;
          border-left: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          background: #fff;
          overflow: hidden;
        }

        .events-header {
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .date-title h3 {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .holiday-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          color: #92400e;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .holiday-icon {
          font-size: 16px;
        }

        .add-event-btn {
          width: 100%;
          padding: 12px;
          background: #3b82f6;
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .add-event-btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .plus-icon {
          font-size: 18px;
          font-weight: bold;
        }

        .events-list {
          flex: 1;
          overflow-y: auto;
          padding: 16px 24px;
        }

        .empty-state {
          text-align: center;
          padding: 48px 24px;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .empty-state p {
          margin: 0 0 8px 0;
          color: #6b7280;
          font-size: 16px;
          font-weight: 500;
        }

        .empty-state span {
          color: #9ca3af;
          font-size: 14px;
        }

        .holiday-only-message {
          text-align: center;
          padding: 32px 24px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .celebration-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 12px;
        }

        .holiday-only-message p {
          margin: 0;
          color: #92400e;
          font-size: 16px;
          font-weight: 600;
        }

        .event-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          transition: all 0.2s;
          position: relative;
        }

        .event-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }

        .event-card.category-work {
          border-left: 3px solid #3b82f6;
        }

        .event-card.category-personal {
          border-left: 3px solid #10b981;
        }

        .event-card.category-holiday {
          border-left: 3px solid #f59e0b;
        }

        .event-card.category-birthday {
          border-left: 3px solid #ec4899;
        }

        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .event-time {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .category-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .category-badge.work {
          background: #dbeafe;
          color: #1e40af;
        }

        .category-badge.personal {
          background: #d1fae5;
          color: #065f46;
        }

        .category-badge.holiday {
          background: #fef3c7;
          color: #92400e;
        }

        .category-badge.birthday {
          background: #fce7f3;
          color: #9f1239;
        }

        .event-text {
          color: #111827;
          font-size: 15px;
          line-height: 1.5;
        }

        .delete-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .delete-btn:hover {
          background: #fee2e2;
          color: #dc2626;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          width: 90%;
          max-width: 450px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-content h3 {
          margin: 0 0 24px 0;
          color: #111827;
          font-size: 20px;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #374151;
          font-weight: 500;
          font-size: 14px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 90px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .modal-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .modal-btn.primary {
          background: #3b82f6;
          color: #fff;
        }

        .modal-btn.primary:hover {
          background: #2563eb;
        }

        .modal-btn.secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .modal-btn.secondary:hover {
          background: #e5e7eb;
        }

        .search-results {
          padding: 24px;
        }

        .search-results h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .search-result-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          transition: all 0.2s;
        }

        .search-result-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .search-result-card.category-work {
          border-left: 3px solid #3b82f6;
        }

        .search-result-card.category-personal {
          border-left: 3px solid #10b981;
        }

        .search-result-card.category-holiday {
          border-left: 3px solid #f59e0b;
        }

        .search-result-card.category-birthday {
          border-left: 3px solid #ec4899;
        }

        .result-date {
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .result-content {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .result-time {
          font-weight: 600;
          color: #374151;
          font-size: 13px;
        }

        .result-text {
          flex: 1;
          color: #111827;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .calendar-content {
            flex-direction: column;
          }
          .events-panel {
            border-left: none;
            border-top: 1px solid #e5e7eb;
            max-width: none;
          }
        }
      `}</style>

      <div className="calendar-header">
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <div className="header-controls">
          <button className="nav-btn" onClick={previousMonth}>←</button>
          <button className="today-btn" onClick={goToToday}>Today</button>
          <button className="jump-btn" onClick={jumpToDate}>Jump to Date</button>
          <button className="nav-btn" onClick={nextMonth}>→</button>
        </div>
      </div>

      <div className="toolbar">
        <div className="filter-group">
          <label>Filter:</label>
          <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Events</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="holiday">Holiday</option>
            <option value="birthday">Birthday</option>
          </select>
        </div>
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" onClick={() => setSearchQuery(searchQuery)}>Search</button>
        </div>
      </div>

      <div className="calendar-content">
        <div className="calendar-grid-container">
          <div className="day-headers">
            {dayNames.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          <div className="calendar-grid">
            {renderCalendarDays()}
          </div>
        </div>

        {searchQuery.trim() ? renderSearchResults() : renderEvents()}
      </div>

      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Event</h3>
            <div className="form-group">
              <label>Event Description</label>
              <textarea
                value={eventText}
                onChange={(e) => setEventText(e.target.value)}
                placeholder="Enter event details..."
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="holiday">Holiday</option>
                <option value="birthday">Birthday</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="modal-btn secondary" onClick={() => setShowEventModal(false)}>
                Cancel
              </button>
              <button className="modal-btn primary" onClick={handleAddEvent}>
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export function displayCalendar() {
  return <Calendar />;
}

export default Calendar;