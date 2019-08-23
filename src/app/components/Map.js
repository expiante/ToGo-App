import React, { useState, useRef, memo } from 'react';
import { compose } from 'recompose';
import { OverlayPopup, MapMarker } from './';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import { mapConfig } from 'config/consts';

const { checkedMark, uncheckedMark, newMark } = mapConfig.marker.icons;

const Map = ({
  data = [],
  location,
  position,
  zoom,
  onFormSubmit,
  onSelectNewLocation,
  onSelectExistingLocation,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const popupOverlay = useRef(null);

  const setNewLocation = e => {
    if (popupOverlay.current) return;
    const { lat, lng } = e.latLng;
    const newPos = { lat: lat(), lng: lng() };
    onSelectNewLocation(newPos);
    setShowOverlay(false);
  };

  return (
    <GoogleMap
      defaultZoom={zoom}
      zoom={zoom}
      defaultCenter={position}
      center={position}
      onClick={setNewLocation}
      defaultOptions={{ ...mapConfig.config }}
    >
      {showOverlay && (
        <OverlayPopup
          location={location}
          onClose={() => setShowOverlay(false)}
          onSubmit={onFormSubmit}
          referene={popupOverlay}
          position={position}
        />
      )}
      {data.length &&
        data.map(item => (
          <MapMarker
            key={item.id}
            position={{ lat: item.lat, lng: item.lng }}
            icon={{ url: item.visited ? checkedMark : uncheckedMark }}
            onClick={() => {
              onSelectExistingLocation(item);
              setShowOverlay(true);
            }}
          />
        ))}
      {position && !location && (
        <MapMarker
          position={position}
          icon={{ url: newMark }}
          onClick={() => setShowOverlay(true)}
        />
      )}
    </GoogleMap>
  );
};

export default compose(
  withScriptjs,
  withGoogleMap,
  memo,
)(Map);
