import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/calendar.css';
import { baseUrl, getRequest, postRequest } from '../utils/service';
import Button from '../components/common/Button';
import frLocale from '@fullcalendar/core/locales/fr';
import { AuthContext } from '../contexts/AuthContext';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';


const CalendarPage = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [establishments, setEstablishments] = useState([]);
    const [selectedEstablishment, setSelectedEstablishment] = useState('');
    const [slots, setSlots] = useState([]);
    const calendarRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [visibleSlots, setVisibleSlots] = useState(2); 
    const [selectedSlot, setSelectedSlot] = useState(null);
    const { user, token, getUser } = useContext(AuthContext);


    useEffect(() => {
        if(user){
                getUser(user.id)
        }else(error) =>{
         console.error("no user",error)
     }

    }, [user]);

    const handleEventClick = (clickInfo) => {
    };

    const handleDateClick = async (info) => {
        setSelectedDate(info.dateStr);
    
        const token = localStorage.getItem('token');
        if (!token || !selectedEstablishment) {
            return;
        }
        try {
            const response = await fetch(
                `${baseUrl}/establishments/${selectedEstablishment}/slots?date=${info.dateStr}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Fetched slots for selected date and establishment:', data);
    
            const filteredSlots = data.filter(slot => formatDate(slot.day_start_at) === info.dateStr);
            setSlots(filteredSlots);
    
            setShowAddModal(true);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const handleCloseAddModal = () => setShowAddModal(false);

    const getEstablishment = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
    
        try {
          const response = await fetch(`${baseUrl}/establishments`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          setEstablishments(data);
        } catch (error) {
          console.error('Error fetching establishments:', error);
        } finally {
         
        }
      }, [baseUrl]);
    
      useEffect(() => {
        getEstablishment();
      }, [getEstablishment]);

      useEffect(() => {
        const fetchEvents = async () => {
          const token = localStorage.getItem('token');
          if (!token || !selectedEstablishment || !selectedDate) {
           
            return;
          }
    
          try {
            const response = await fetch(
              `${baseUrl}/establishments/${selectedEstablishment}/slots?date=${selectedDate}`,
              {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Fetched slots for selected date:', data);
            setSlots(data);
            updateCalendarEvents(data);
          } catch (error) {
            console.error('Error fetching slots:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchEvents();
      }, [baseUrl, selectedEstablishment, selectedDate]);


    const updateCalendarEvents = (slots) => {
        const calendarApi = calendarRef.current.getApi();

        calendarApi.removeAllEvents();

        const events = slots.slice(0, visibleSlots).map(slot => ({
            id: slot.id,
            title: slot.establishment,
            start: slot.day_start_at,
            end: slot.day_end_at,
            extendedProps: {
                coaches: slot.coach_ids.map(coach => coach.coach_name).join(', '),
                duration: `${slot.duration_minutes} minutes`,
                numberOfClients: slot.number_of_clients,
            },
        }));

        calendarApi.addEventSource(events);
    };
    
    useEffect(() => {
        const fetchSlots = async () => {
            const token = localStorage.getItem('token');
            if (!token || !selectedEstablishment) {
                return;
            }

            try {
                const response = await getRequest(
                    `${baseUrl}/establishments/${selectedEstablishment}/slots`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('Fetched slots for selected establishment:', response);
                setSlots(response); 

                updateCalendarEvents(response);
            } catch (error) {
                console.error('Error fetching slots:', error);
            }
        };

        fetchSlots();
    }, [selectedEstablishment]);

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.setOption('locale', frLocale); 
            calendarApi.setOption('firstDay', 1);
        }
    }, [calendarRef]);

    const reservation = async (user_id) => { 
        const token = localStorage.getItem('token');
    
        if (!token || !selectedSlot || !selectedEstablishment) {
            console.error('Missing token, selectedSlot or selectedEstablishment');
            return;
        }
    
        try {
            const response = await fetch(`${baseUrl}/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    establishment_id: selectedEstablishment,
                    slot_id: selectedSlot.id,
                    client_id: user?.id, 
                    status: 'confirmed'
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to create reservation');
            }
    
            const result = await response.json();
            console.log('Reservation created:', result);
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    const handleReservationClick = () => {
        if (!selectedEstablishment || !selectedSlot || !selectedSlot.id) {
            console.error('No establishment or slot selected');
            return;
        }
        reservation(selectedSlot.id); 
    };
    const centerStyle = {
        justfiyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    }

    return (
                                            
        <>
        <NavBar />
        <div className="container" style={centerStyle}>
            <div className="select-establishment">
                <select value={selectedEstablishment} onChange={(event) => setSelectedEstablishment(event.target.value)}>
                    <option value="">Sélectionnez un établissement</option>
                    {establishments.map((establishment) => (
                        <option key={establishment.id} value={establishment.id}>
                            {establishment.display_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="calendar-container">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    editable={true}
                    selectable={true}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                />
            </div>

            {showAddModal && (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">SÉANCES DU {selectedDate}</h4>
                                <button type="button" className="close" onClick={handleCloseAddModal}>&times;</button>
                            </div>
                            <div className="modal-body">
                                {slots.length > 0 ? (
                                    <>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Etablissement</th>
                                                    <th>Nom du coach</th>
                                                    <th>Durée</th>
                                                    <th>Date de fin</th>
                                                    <th>Nombre de clients</th>
                                                    <th>Durée (minutes)</th>
                                                    <th>Sélectionner</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {slots.slice(0, visibleSlots).map((slot) => (
                                                    <tr key={slot.id}>
                                                        <td>{slot.establishment}</td>
                                                        <td>{slot.coach_ids.map(coach => coach.coach_name).join(', ')}</td>
                                                        <td>{slot.duration_minutes} minutes</td>
                                                        <td>{formatDate(slot.day_end_at)}</td>
                                                        <td>{slot.number_of_clients}</td>
                                                        <td>{slot.duration_minutes}</td>
                                                        <td>
                                                            <input
                                                                type="radio"
                                                                name="selectedSlot"
                                                                value={slot.id}
                                                                onChange={() => setSelectedSlot(slot)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <button className="btn btn-primary" onClick={handleReservationClick}>
                                            Réserver
                                        </button>
                                        {slots.length > visibleSlots && (
                                            <button className="btn btn-primary" onClick={() => setVisibleSlots(visibleSlots + 2)}>
                                                Voir plus
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <p>Aucun créneau disponible pour cette date et cet établissement.</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={handleCloseAddModal}>Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <Footer />
    </>
);
};


function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toISOString().split('T')[0]; 
}

export default CalendarPage;
