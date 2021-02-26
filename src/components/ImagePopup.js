import React from 'react';

function ImagePopup(props) {
  const { card, onClose } = props;
  const overlayRef = React.useRef();

  function handleClick({ target }) { // closing popup by clicking on just the overlay and not the image
    if(target === overlayRef.current) onClose();
  }

  return (
    <div className={`overlay overlay_dark ${card._id==null ? '' : 'overlay_opened'}`} ref={overlayRef} onClick={handleClick}>
      <div className="overlay__wrapper">
        <button
          type="button"
          aria-label="Close"
          className="overlay__close-btn overlay__close-btn_type_image-popup"
          onClick={onClose}
        >
        </button>
        <figure className="image-popup">
          <img src={card.link} alt={card.name} className="image-popup__image" />
          <figcaption className="image-popup__title">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;