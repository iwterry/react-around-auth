import React from 'react';

function PopupWithForm(props) {
  const { name, title, children, isOpen, onClose, onSubmit, isSubmitBtnDisabled, submitBtnText } = props;

  const overlayRef = React.useRef();

  const submitBtnClassName = `project-form__submit-btn project-form__submit-btn_type_${name}` + 
    (isSubmitBtnDisabled ? ' project-form__submit-btn_disabled' : '');

  function handleClick({ target }) { // closing popup by clicking on just the overlay and not the form
   if(target === overlayRef.current) onClose();
  }

  return (
    <div className={`overlay ${isOpen ? 'overlay_opened' : ''}`} ref={overlayRef} onClick={handleClick}>
      <div className="overlay__wrapper">
        <button
          type="button"
          aria-label="Close"
          className={`overlay__close-btn overlay__close-btn_type_${name}`}
          onClick={onClose}
        >
        </button>
        <form name={name} className={`project-form project-form_type_${name}`} onSubmit={onSubmit} noValidate> 
          <h3 className={`project-form__title project-form__title_type_${name}`}>
            {title}
          </h3>
          {children}
          <button type="submit" className={submitBtnClassName} disabled={isSubmitBtnDisabled}>
            {submitBtnText || 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;