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
    const [token, setToken] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [coachOptions, setCoachOptions] = useState([]);
    const [selectedTime, setSelectedTime] = useState('12:00'); 
    const [establishments, setEstablishments] = useState([]);
    const [selectedEstablishment, setSelectedEstablishment] = useState('');


    const calendarRef = useRef(null);

 
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

    useEffect(() => {
        getEstablishment();
    }, []);

    const handleEstablishmentChange = (event) => {
        setSelectedEstablishment(event.target.value);
    };
 

    // const getEstablishment = useCallback( async (data) => {
    //     const token = localStorage.getItem('token');
    //     console.log('token', token);
    //     getRequest(`${baseUrl}/brands/establishments`, 
    //         data,{
    //             "Authorization": `Bearer ${token}`,
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setEstablishments(data);
    //     })
    //     .catch(error => console.error('Erreur lors de la récupération des établissements:', error));
    // },[data]);

    const getEstablishment = useCallback( async () => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTk4NDMxMjQsImV4cCI6MTcxOTg0NjcyNCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQG1haWwuY29tIiwiaWQiOjI0fQ.ukIdRuy1-CVG_S1QYgTS7IJdlEXz6YLzLOyFNfGL26cj7VY-zZTDeLRhw0zu9qq8rLGzUzXyDsdq3Rck6cuRXyaWErem0NRuHEZOJCaT4Nb5eK2F6czjVkhKvshMR0zMYZqC9oYdDlc6BklSo87kmm21BfCrOyjetc5e1o4ci4GfXhRc70684jF6gXQ0B9xciaWuvEUc2M3ESA6tVQyYLJGF9-vNteqNJmiw6PuePQUC6RiPfRTM_q5vQ5Fwg6Rn8wPkMD33b7OjYonGeqcuPsQGHdabPsQBXXckh5t_zszMiwKltWAgMOs9GedSjMdMrwkXKx52cpqj6mJfGrGoGg';
        console.log('token', token);
        fetch(`${baseUrl}/brands/establishments`, 
            {
                "Authorization": `Bearer ${token}`,
        })
        .then(response => response.json())
        .then(data => {
            setEstablishments(data);
        })
        .catch(error => console.error('Erreur lors de la récupération des établissements:', error));
    },[]);

    const reservationFields = [
        { type: FIELD_TYPES.TEXT, label: 'Nom', name: 'name' },
        { type: FIELD_TYPES.EMAIL, label: 'Email', name: 'email' },
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
 <select value={selectedEstablishment} onChange={handleEstablishmentChange}>
                <option value="">Sélectionnez un établissement</option>
                {establishments.map((establishment) => (
                    <option key={establishment.id} value={establishment.display_name}>
                        {establishment.display_name}
                    </option>
                ))}
            </select>
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
