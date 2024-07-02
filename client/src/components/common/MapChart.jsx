import GoogleMapReact from 'google-map-react';
import "../../styles/components.css";
import React from 'react';


const Marker = ({ text }) => (
  <div>
    <svg height="20" width="20">
      <circle cx="10" cy="10" r="10" fill="red" />
    </svg>
    {text}
  </div>
);

const createMarkers = (count) => 
  Array.from({ length: count }).map(() => ({
    lat: 41 + Math.random() * (51 - 41),
    lng: -5.266007882805492 + Math.random() * (9.66249990276215 - (-5.266007882805492)),
  }));

  const MapContainer = ({ children }) => (
    <>
      <div style={{
        border: "1px solid #ccc",
          backgroundColor: "#111827",
          color: "white",
          borderRadius: "10px",
          width: '90%',
          marginLeft: '5%',
          display: 'flex',
          flexDirection: 'row-reverse',
        }} className='text-info'>
       
          <p style={{
              width: '100%',
              padding: '20px',
              textAlign: 'center',
              margin: 'auto',
              top: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            }}>
              Découvrez <span className='animated-underline'>notre carte interactive ci-dessous,</span> où chaque marqueur représente un lieu où <span className='animated-underline'>vous pouvez prendre rendez-vous</span>pour rencontrer un coach sportif.
              Explorez, choisissez votre emplacement préféré et réservez votre session dès aujourd'hui !
          </p>
       <div style={{
          height: '65vh',
          width: '80%',
          position: 'relative',
        }}>
          {children}
        </div>
        </div>
  
    </>
  );

export default function MapChart() {
  const center = { lat: 46.603354, lng: 1.888334 }; 
  const markers = createMarkers(10);

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={
          { key: import.meta.env.VITE_API_KEY_GOOGLE}
        }
        defaultCenter={center}
        defaultZoom={5}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            lat={marker.lat}
            lng={marker.lng}
            marker={marker}
            className='pointer'
          />
        ))}
      </GoogleMapReact>
    </MapContainer>
  );
}
