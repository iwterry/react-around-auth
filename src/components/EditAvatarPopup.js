import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const avatarInputRef = React.createRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    const avatarInputElement = avatarInputRef.current;
    onUpdateAvatar(avatarInputElement.value);

    avatarInputElement.value = '';
  }

  return (
    <PopupWithForm name="profile-img-change" title="Change profile picture" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="project-form__field-wrapper project-form__field-wrapper_form_profile-img-change">
        <input
          type="url"
          aria-label="Avatar link"
          name="avatar"
          id="profile-image-link-input"
          className="project-form__input project-form__input_type_profile-img-change-field"
          placeholder="Avatar link"
          ref={avatarInputRef}
          required
        />
        <p className="project-form__input-error project-form__input-error_field_profile-image-link-input"></p>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;