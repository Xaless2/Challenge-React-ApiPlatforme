// // src/pages/CalendarPage.jsx
// import React, { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';


// const CalendarPage = () => {
//     const [events, setEvents] = useState([
    
//     ]);

//     const handleDateClick = (arg) => {
//         const title = prompt('Event Title:');
//         if (title) {
//             setEvents([...events, { title, start: arg.date, allDay: arg.allDay }]);
//         }
//     };

//     return (
//         <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px', fontFamily: 'Helvetica Neue, Arial, Verdana, sans-serif', backgroundColor: '#DDDDDD' }}>
//             <div id="wrap" style={{ width: '1100px', margin: '0 auto' }}>
//                 <div id="external-events" style={{ float: 'left', width: '150px', padding: '0 10px', textAlign: 'left' }}>
//                     <h4 style={{ fontSize: '16px', marginTop: '0', paddingTop: '1em' }}>Draggable Events</h4>
//                     {/* Add draggable events here if needed */}
//                 </div>

//                 <div id="calendar" style={{ margin: '0 auto', width: '900px', backgroundColor: '#FFFFFF', borderRadius: '6px', boxShadow: '0 1px 2px #C3C3C3' }}>
//                     <FullCalendar
//                         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                         initialView="dayGridMonth"
//                         headerToolbar={{
//                             left: 'title',
//                             center: 'dayGridMonth,timeGridWeek,timeGridDay',
//                             right: 'prev,next today'
//                         }}
//                         editable={true}
//                         selectable={true}
//                         events={events}
//                         dateClick={handleDateClick}
//                         droppable={true}
//                     />
//                 </div>

//                 <div style={{ clear: 'both' }}></div>
//             </div>
//         </div>
//     );
// };

// export default CalendarPage;




import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


const CalendarPage = () => {
    const handleDateClick = (arg) => {
        const title = prompt('Event Title:');
        if (title) {
            // Handle event creation here
        }
    };

    return (
        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px', fontFamily: 'Helvetica Neue, Arial, Verdana, sans-serif', backgroundColor: '#DDDDDD' }}>
            <div id="wrap" style={{ width: '1100px', margin: '0 auto' }}>
                <div id="calendar" style={{ margin: '0 auto', width: '900px', backgroundColor: '#FFFFFF', borderRadius: '6px', boxShadow: '0 1px 2px #C3C3C3' }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'title',
                            center: 'dayGridMonth,timeGridWeek,timeGridDay',
                            right: 'prev,next today'
                        }}
                        editable={true}
                        selectable={true}
                        dateClick={handleDateClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
