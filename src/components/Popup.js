import React from 'react';

function Popup(props) {
  const { name, children, isOpen, onClose, additionalCssClassesStr='' } = props;

  const overlayRef = React.useRef();

  function handleClick({ target }) { 
    // closing popup by clicking on just the overlay and not its contents
   if(target === overlayRef.current) onClose();

    // Chose to use refs to access the DOM element directly,
    // but could also rely on CSS class '.overlay' instead.
  }

  return (
    <div className={`overlay ${additionalCssClassesStr} ${isOpen ? 'overlay_opened' : ''}`} ref={overlayRef} onClick={handleClick}>
      <div className="overlay__wrapper">
        <button
          type="button"
          aria-label="Close"
          className={`overlay__close-btn overlay__close-btn_type_${name}`}
          onClick={onClose}
        >
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup;