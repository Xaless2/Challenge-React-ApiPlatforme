import React from 'react';
import PropTypes from 'prop-types';

const CalendarList = ({ calendarItems, onSelectedCalendarsChange }) => {
  return (
    <div className="calendar-list">
      {calendarItems.map((item) => (
        <div key={item.id} className="calendar-item">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => onSelectedCalendarsChange(item.id)}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

CalendarList.propTypes = {
  calendarItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onSelectedCalendarsChange: PropTypes.func.isRequired,
};

export default CalendarList;