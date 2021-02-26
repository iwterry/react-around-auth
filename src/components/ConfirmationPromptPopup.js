import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPromptPopup(props) {
  const { isOpen, onClose, onConfirmation } = props;

  function handleSubmit(evt) {
    evt.preventDefault();

    onConfirmation();
  }
  return (
    <PopupWithForm 
      name="confirmation-prompt" 
      title="Are you sure?" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmationPromptPopup;