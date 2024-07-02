import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import CardCutomEtablishement from '../common/CardCutomEtablishement';

const GoogleMap = ({ google, image, name, addresses, rating, price, description }) => {
  const [infoWindow, setInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);

  useEffect(() => {
    if (!addresses) {
      return;
    }
  
    const geocoder = new google.maps.Geocoder();
  
    addresses.forEach(address => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          setCoordinates(prevCoordinates => [
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
    height: "100%",
    width: "100%",
  };

  return (
    <div>
      {coordinates.length > 0 ? (
        <Map
          onClick={onMapClick}
          google={google}
          zoom={8}
          style={style}
          initialCenter={coordinates[0]}
        >
          {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            onClick={(props, marker, e) => onMarkerClick(props, marker, e, index)}
            title={"The marker's title will appear as a tooltip."}
            name={name}
            position={coordinate}
          />
        ))}
          <InfoWindow
            marker={activeMarker}
            visible={infoWindow}
          >
            <CardCutomEtablishement 
              image={image}
              name={name}
              address={addresses[activeMarkerIndex]}
              rating={rating}
              price={price}
              description={description}
            />
          </InfoWindow>
        </Map>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey:"AIzaSyCJSMrBuEV5AeQFGC_4lCI24Ewyj9Axq54",
})(GoogleMap);