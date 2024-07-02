import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import CardCutomEtablishement from '../common/CardCutomEtablishement';

const GoogleMap = ({ google, addresses }) => {
  const [infoWindow, setInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);

  useEffect(() => {
    if (!addresses) {
      return;
    }

    const geocoder = new google.maps.Geocoder();

    addresses.forEach((address) => {
      if (address) {
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
      }
    });
  }, [addresses, google.maps.Geocoder]);

  const onMarkerClick = (props, marker, e, index) => {
    if (infoWindow) {
      setInfoWindow(false);
    }
    setSelectedPlace(props);
    setActiveMarker(marker);
    setActiveMarkerIndex(index);
    setTimeout(() => setInfoWindow(true), 0);
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
      {addresses && addresses.length > 0 ? (
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
              onClick={(props, marker, e) => onMarkerClick(props, marker, e, index)}
              position={coordinate}
            />
          ))}
          <InfoWindow marker={activeMarker} visible={infoWindow}>
            <div>
              <h3>{selectedPlace.name}</h3>
              <p>{selectedPlace.address}</p>
              <CardCutomEtablishement />
            </div>
          </InfoWindow>
        </Map>
      ) : (
        <div>Pas encore des établissements disponibles</div>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_API_KEY_GOOGLE,
})(GoogleMap);
