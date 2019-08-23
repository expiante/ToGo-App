import React, { memo } from 'react';
import { Marker } from 'react-google-maps';

const MapMarker = ({ position, icon, onClick }) => {
  return <Marker position={position} icon={icon} onClick={onClick} />;
};

export default memo(MapMarker);
