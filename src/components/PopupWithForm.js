import React from 'react';
import Popup from './Popup';

function PopupWithForm(props) {
  const { name, title, children, isOpen, onClose, onSubmit, isSubmitBtnDisabled, submitBtnText } = props;

  const submitBtnClassName = `project-form__submit-btn project-form__submit-btn_type_${name}` + 
    (isSubmitBtnDisabled ? ' project-form__submit-btn_disabled' : '');

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <form name={name} className={`project-form project-form_type_${name}`} onSubmit={onSubmit} noValidate> 
        <h3 className={`project-form__title project-form__title_type_${name}`}>
          {title}
        </h3>
        {children}
        <button type="submit" className={submitBtnClassName} disabled={isSubmitBtnDisabled}>
          {submitBtnText || 'Submit'}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;