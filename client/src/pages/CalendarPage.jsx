import React, { useState, useEffect, useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FormBuilder, { FIELD_TYPES } from '../components/builder/FormBuilder';
import '../styles/calendar.css';
import frLocale from '@fullcalendar/core/locales/fr'; 
import Button from '../components/common/Button';
import { baseUrl, getRequest } from '../utils/service';
import UserList from '../components/common/UserList';

const CalendarPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('12:00'); 
    const [establishments, setEstablishments] = useState([]);
    const [selectedEstablishment, setSelectedEstablishment] = useState('');
    const [selectedEstablishmentInfo, setSelectedEstablishmentInfo] = useState(null); 
    const [slots, setSlots] = useState([]); // New state for slots
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const calendarRef = useRef(null);
    const [selectedSlot, setSelectedSlot] = useState(null); 
    const [selectedEvent, setSelectedEvent] = useState(null); // State to hold selected event details
    const [events, setEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([])



   
    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setShowEditModal(true);
        window.onclick = function(event) {
                    if (event.target === document.querySelector('.modal')) {
                        setShowAddModal(false);
                    }
                };
    };

    const handleDateClick = async (info) => {
        setSelectedDate(info.dateStr); // Set the selected date
        setShowAddModal(true);
    
        // Fetch slots for the selected date
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
    
        try {
            const response = await getRequest(
                `${baseUrl}/establishments/${selectedEstablishment}/slots?date=${info.dateStr}`,
                {
                    "Authorization": `Bearer ${token}`,
                }
            );
            console.log('Fetched slots for selected date:', response);
            setSlots(response); // Update slots with the fetched data
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseAddModal = () => setShowAddModal(false);
    const handleCloseEditModal = () => setShowEditModal(false);



    const getEstablishment = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        try {
            const response = await getRequest(
                `${baseUrl}/establishments`,
                {
                    "Authorization": `Bearer ${token}`,
                }
            );
            console.log('Fetched establishments:', response); 
            setEstablishments(response); 
        } catch (error) {
            setError(error?.message || error);
        }
    }, []);

    useEffect(() => {
        getEstablishment();
    }, [getEstablishment]);


    useEffect(() => {
        // Fetch events from the API
        const fetchEvents = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            try {
                const response = await getRequest(
                    `${baseUrl}/establishments/${selectedEstablishment}/slots`,
                    {
                        "Authorization": `Bearer ${token}`,
                    }
                );
                console.log('Fetched slots:', response);
                setEvents(response); 
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedEstablishment) {
            fetchEvents();
        }
    }, [selectedEstablishment]);


    const handleEstablishmentChange = async (event) => {
        const establishmentId = event.target.value;
        setSelectedEstablishment(establishmentId);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await getRequest(
                `${baseUrl}/establishments/${establishmentId}/slots`,
                {
                    "Authorization": `Bearer ${token}`,
                }
            );
         console.log('Fetched slots:', response);
            setSlots(response); 
        } catch (error) {
            setError(error?.message || error);
        }
    };

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();

            // Event click handler
            calendarApi.on('eventClick', function(info) {
                const modal = document.getElementById('schedule-edit');
                if (modal) {
                    
                }
            });

            // Day click handler
            calendarApi.on('dateClick', function(info) {
                const modal = document.getElementById('schedule-add');
                if (modal) {
                    // Example: Bootstrap modal
                    modal.modal('show');
                }
            });
        }
    }, []);
  

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.setOption('locale', frLocale); 
            calendarApi.setOption('firstDay', 1);
        }
    }, [calendarRef]);

    return (
        <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <select value={selectedEstablishment} onChange={handleEstablishmentChange}>
                <option value="">Sélectionnez un établissement</option>
                {establishments.map((establishment) => (
                    <option key={establishment.id} value={establishment.id}>
                        {establishment.display_name}
                    </option>
                ))}
            </select>
            <div>
                {/* Add Modal */}
                <div className={`modal fade ${showAddModal ? 'show' : ''}`} style={{ display: showAddModal ? 'block' : 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Ajouter ma réservation</h4>
                                <button type="button" className="close" onClick={handleCloseAddModal}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    
                                    {slots.length > 0 && (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Etablissement</th>
                                                    <th>Nom du coach</th>
                                                    <th>Durée</th>
                                                    <th>Heure</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {slots.map(slot => (
                                                    <tr key={slot.establishment}>
                                                        <td>{slot.coach}</td>
                                                        <td>{slot.available ? 'Disponible' : 'Occupé'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleCloseAddModal}>Fermer</button>
                                <button type="button" className="btn btn-success">Confirmer</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Modifier ma réservation</h4>
                                <button type="button" className="close" onClick={handleCloseEditModal}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Réservation de coaching:</label>
                                        <input type="text" className="form-control" defaultValue={selectedEvent ? selectedEvent.title : ''} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleCloseEditModal}>Fermer</button>
                                <button type="button" className="btn btn-success">Modifier</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FullCalendar component */}
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    editable={true}
                    selectable={true}
                    initialView="dayGridMonth"
                  
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek','timeGridDay',
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                />
            </div>
        </div>
    );
};

export default CalendarPage;
