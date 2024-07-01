import React from 'react';

export const TooltipContentTemplate = ({ deleteCurrentAppointment, editCurrentAppointment, selectedAppointmentData }) => {
  return (
    <div className="tooltip-content-template">
      <h3>Appointment Details</h3>
      <p>{selectedAppointmentData?.description}</p>
      <button onClick={editCurrentAppointment}>Edit</button>
      <button onClick={deleteCurrentAppointment}>Delete</button>
    </div>
  );
};
