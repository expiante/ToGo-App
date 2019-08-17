import React from 'react';
import { OverlayView } from 'react-google-maps';
import { PopupForm } from '.';

const OverlayPopup = ({ data, position, onClose, onSubmit, referene }) => {
  const submitChanges = data => {
    onSubmit(data);
    onClose();
  };

  const getPixelPositionOffset = (width, height) => {
    return {
      x: -(width / 2),
      y: -(height / 2),
    };
  };

  return (
    <OverlayView
      position={{ ...position }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className='card' ref={referene}>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-start mb-3'>
            <h5 className='card-title mb-0 mr-3'>
              {data
                ? 'Update the information of this place'
                : 'Write an information about this place'}
            </h5>
            <button className='btn btn-outline-secondary btn-sm close-btn' onClick={onClose}>
              <span />
              <span />
            </button>
          </div>
          <p className='card-text'>
            Type some information, that you want to have about this location.
          </p>
          <PopupForm onSubmit={submitChanges} data={data} />
        </div>
      </div>
    </OverlayView>
  );
};

export default OverlayPopup;
