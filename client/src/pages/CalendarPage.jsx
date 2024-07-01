import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FormBuilder, { FIELD_TYPES } from '../components/builder/FormBuilder';
import '../styles/calendar.css';
import frLocale from '@fullcalendar/core/locales/fr'; 
import Button from '../components/common/Button';

const CalendarPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [coachOptions, setCoachOptions] = useState([]);
    const [selectedTime, setSelectedTime] = useState('12:00'); // Heure initiale par défaut

    const calendarRef = useRef(null);

    useEffect(() => {
        fetchCoachOptions();
    }, []);

    const fetchCoachOptions = () => {
        fetch('/api/coaches')
            .then(response => response.json())
            .then(data => {
                const options = data.map(coach => ({
                    value: coach.id,
                    label: coach.name
                }));
                setCoachOptions(options);
            })
            .catch(error => console.error('Error fetching coaches:', error));
    };

    const handleDateClick = (arg) => {
        setSelectedDate(arg.date);
        setShowModal(true);
        //fermer le modal au clic extérieur
        window.onclick = function(event) {
            if (event.target === document.querySelector('.modal')) {
                setShowModal(false);
            }
        };
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmitForm = (formData) => {
        console.log('Form submitted with data:', formData);

        fetch('/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        setShowModal(false);
    };

 
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
            setUser(response);
    
            return response; 
        } catch (error) {
            setError(error?.message || error);
        }
    }, []);

    const reservationFields = [
        { type: FIELD_TYPES.TEXT, label: 'Nom', name: 'name' },
        { type: FIELD_TYPES.EMAIL, label: 'Email', name: 'email' },
        { type: FIELD_TYPES.SELECT, label: 'Nom du coach', name: 'coachName', options: coachOptions },
        { type: FIELD_TYPES.DATE, label: 'Date', name: 'date', value: selectedDate ? selectedDate.toISOString().split('T')[0] : '' },
        { type: FIELD_TYPES.TIME, label: 'Heure de réservation', name: 'reservationTime', value: selectedTime, onChange: setSelectedTime },
        { type: FIELD_TYPES.TEXTAREA, label: 'Commentaires', name: 'comments' },
        { type: FIELD_TYPES.BUTTON, label: 'Enregistrer', onClick: handleSubmitForm },
    ];

 
    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            // Configurer les options de localisation
            calendarApi.setOption('locale', frLocale); // Utiliser le français comme langue par défaut
            calendarApi.setOption('firstDay', 1); // Définir le premier jour de la semaine (lundi)
            // Vous pouvez également personnaliser d'autres options de localisation ici
        }
    }, [calendarRef]);

    return (
        <div style={ {paddingLeft : "5%" , paddingRight:"5%"} }>
       <Button text="Ajouter un rendez-vous" onClick={getEstablishment} />

            <div id="calendar">
                <FullCalendar
                    ref={calendarRef}
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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <FormBuilder fields={reservationFields} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarPage;
