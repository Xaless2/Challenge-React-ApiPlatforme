import React from 'react';

const Agenda = ({ items, toggleOpen, resources, showAppointmentTooltip }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div>{item.startDate.toString()}</div>
            <button onClick={() => showAppointmentTooltip(item)}>Show</button>
          </li>
        ))}
      </ul>
      <button onClick={toggleOpen}>Close</button>
    </div>
  );
};

export default Agenda;
