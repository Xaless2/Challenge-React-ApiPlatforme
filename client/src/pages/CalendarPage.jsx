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
