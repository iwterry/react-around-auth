import React from 'react';

function ImagePopup(props) {
  const { card, onClose } = props;

  return (
    <div className={`overlay overlay_dark ${card.id==null ? '' : 'overlay_opened'}`}>
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