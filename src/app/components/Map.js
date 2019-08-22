import React, { useState, useRef, memo } from 'react';
import { compose } from 'recompose';
import { OverlayPopup } from '.';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { mapConfig } from 'config/consts';

const { checkedMark, uncheckedMark, newMark } = mapConfig.marker.icons;

const Map = ({
  data = [],
  location,
  position,
  zoom,
  onFormSubmit,
  onSelectNewLocation,
  onSelectExistingLocation
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const popupOverlay = useRef(null);

  const selectLocation = (item) => {
    setShowOverlay(true);
    onSelectExistingLocation(item);
  }

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
      {data.length && data.map((v, index) =>
        <Marker
          key={`${v.id}-${index}`}
          position={{ lat: v.lat, lng: v.lng }}
          onClick={() => selectLocation(v)}
          icon={{ url: v.visited ? checkedMark : uncheckedMark }}
        />
      )}
      {position && !location &&
        <Marker
          position={position}
          onClick={() => setShowOverlay(true)}
          icon={{ url: newMark }}
        />
      }
    </GoogleMap>
  );
};

export default compose(
  withScriptjs,
  withGoogleMap,
  memo
)(Map);
