import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import Button from './Button';


const CustomCard = () => {
    const style = {
        fontSize : '17px',
    }
    const style2 = {
        width: 'auto',
    }
  return (
    <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4" style={style2}>
      <div className="flex-shrink-0">
        <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo"/>
      </div>
      <div style={style2}>
        <div className="text-xl font-medium text-black">Nom de l'etablissement</div>
        <p className="text-gray-500">Address</p>
        <div className="text-xl font-medium text-black">
            <span className="text-gray-500" style={style}>Rating</span>
        </div>
        <div className="text-xl font-medium text-black">
            <span className="text-gray-500" style={style}>Prix</span>
        </div>
        <div className="text-xl font-medium text-black">
            <span className="text-gray-500" style={style}>Description</span>
        </div>
      </div>
      <div className='flex space-x-4'>
        <Button
            onClick={() => {
            console.log('clicked')
            }}
            text={'Voir plus'}
        />
        <Button
            onClick={() => {
            console.log('clicked')
            }}
            text={'Reserver'}
        />
        </div>
        
     
    </div>
  );
};

const GoogleMap = (props) => {
  const [infoWindow, setInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setInfoWindow(true);
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

  const coordinates = {
    lat: 49.0167,
    lng: 2.0333,
  };

  return (
    <div>
      <Map
        onClick={onMapClick}
        google={props.google}
        zoom={8}
        style={style}
        initialCenter={coordinates}
      >
        <Marker
          onClick={onMarkerClick}
          title={"The marker's title will appear as a tooltip."}
          name={"chez ady "}
          position={coordinates}
        />
        <InfoWindow
          marker={activeMarker}
          visible={infoWindow}
        >
          <CustomCard />
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey:"",
})(GoogleMap);