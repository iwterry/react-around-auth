import React from 'react';
import PopupWithForm from './PopupWithForm';

import { getInputErrors, getInputFieldErrorClassName } from '../utils/utils';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  
  const [error, setError] = React.useState({});
  const [ isSubmitBtnDisabled, setIsSubmitBtnDisabled ] = React.useState(true);

  const avatarInputRef = React.createRef();

  const profileAvatarFieldName = 'profile-avatar';
  const avatarFieldErrorClassName = getInputFieldErrorClassName(error, profileAvatarFieldName, isOpen);

  function handleSubmit(evt) {
    evt.preventDefault();

    const avatarInputElement = avatarInputRef.current;
    onUpdateAvatar(avatarInputElement.value);

    avatarInputElement.value = '';
  }

  function handleInputValidation({ target: inputElement }) {
    setError(getInputErrors(error, inputElement));
    setIsSubmitBtnDisabled(!avatarInputRef.current.validity.valid);
  }
      
  return (
    <PopupWithForm 
      name="profile-img-change" 
      title="Change profile picture" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
      isSubmitBtnDisabled={isSubmitBtnDisabled}
    >
      <div className="project-form__field-wrapper project-form__field-wrapper_form_profile-img-change">
        <input
          type="url"
          aria-label="Avatar link"
          name={profileAvatarFieldName}
          className="project-form__input project-form__input_type_profile-img-change-field"
          placeholder="Avatar link"
          ref={avatarInputRef}
          onChange={handleInputValidation}
          onBlur={handleInputValidation}
          required
        />
        <p className={avatarFieldErrorClassName}>{error[profileAvatarFieldName]}</p>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;