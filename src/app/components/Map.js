import React, { useState, useRef, memo } from 'react';
import { compose } from 'recompose';
import { OverlayPopup } from '.';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { mapConfig } from 'config/consts';

const { checked, unchecked } = mapConfig.marker.icons;
const defaultZoom = 12;

const Map = memo(({ data, position, onFormSubmit, onSelectNewPosition }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const popupOverlay = useRef(null);
  const zoom = data ? data.zoom : defaultZoom;

  const setNewLocation = e => {
    if (popupOverlay.current) return;
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    onSelectNewPosition(newPos);
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
          data={data}
          onClose={() => setShowOverlay(false)}
          onSubmit={onFormSubmit}
          referene={popupOverlay}
          position={position}
        />
      )}
      <Marker
        position={position}
        onClick={() => setShowOverlay(!showOverlay)}
        icon={{ url: data && data.visited ? checked : unchecked }}
      />
    </GoogleMap>
  );
});

export default compose(
  withScriptjs,
  withGoogleMap,
)(Map);
