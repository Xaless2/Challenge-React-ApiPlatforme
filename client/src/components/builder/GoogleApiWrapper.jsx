import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import CardCutomEtablishement from '../common/CardCutomEtablishement';

const GoogleMap = ({ google, establishments, onMarkerClickHandler }) => {
  const [infoWindow, setInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);

  useEffect(() => {
    if (!establishments) {
      return;
    }

    const geocoder = new google.maps.Geocoder();

    establishments.forEach((establishment) => {
      const address = `${establishment.address}, ${establishment.zip_code}, ${establishment.city}`;
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          setCoordinates((prevCoordinates) => [
            ...prevCoordinates,
            {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            },
          ]);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }, [establishments, google.maps.Geocoder]);

  const handleMarkerClick = (props, marker, e, index) => {
    if (infoWindow) {
      setInfoWindow(false);
    }
    setSelectedPlace(props);
    setActiveMarker(marker);
    setActiveMarkerIndex(index);
    setTimeout(() => setInfoWindow(true), 0);

    if (onMarkerClickHandler) {
      onMarkerClickHandler(props.address);
    }
  };

  const onMapClick = (props) => {
    if (infoWindow) {
      setInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const style = {
    height: '100%',
    width: '100%',
  };

  return (
    <div>
      {establishments && establishments.length > 0 ? (
        <Map
          onClick={onMapClick}
          google={google}
          zoom={10}
          style={style}
          initialCenter={{ lat: 48.8566, lng: 2.3522 }}
        >
          {coordinates.map((coordinate, index) => (
            <Marker
              key={index}
              onClick={(props, marker, e) => handleMarkerClick(props, marker, e, index)}
              position={coordinate}
            />
          ))}
          <InfoWindow marker={activeMarker} visible={infoWindow}>
            <div>
              <CardCutomEtablishement
                
              />
            </div>
          </InfoWindow>
        </Map>
      ) : (
        <div>Pas encore d'établissements disponibles</div>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_API_KEY_GOOGLE,
})(GoogleMap);
