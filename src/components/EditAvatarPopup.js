import React from 'react';
import PopupWithForm from './PopupWithForm';

import { getInputErrors, getInputFieldErrorClassName } from '../utils/utils';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const avatarInputRef = React.createRef();
  const [error, setError] = React.useState({});

  const profileAvatarFieldName = 'profile-avatar';
  const avatarFieldErrorClassName = getInputFieldErrorClassName(error, profileAvatarFieldName);

  function handleSubmit(evt) {
    evt.preventDefault();

    const avatarInputElement = avatarInputRef.current;
    onUpdateAvatar(avatarInputElement.value);

    avatarInputElement.value = '';
  }

  function handleInputChange({ target: inputElement }) {
    setError(getInputErrors(error, inputElement));
    console.log(error);
  }
      
  return (
    <PopupWithForm name="profile-img-change" title="Change profile picture" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="project-form__field-wrapper project-form__field-wrapper_form_profile-img-change">
        <input
          type="url"
          aria-label="Avatar link"
          name={profileAvatarFieldName}
          className="project-form__input project-form__input_type_profile-img-change-field"
          placeholder="Avatar link"
          ref={avatarInputRef}
          onChange={handleInputChange}
          required
        />
        <p className={avatarFieldErrorClassName}>{error[profileAvatarFieldName]}</p>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;