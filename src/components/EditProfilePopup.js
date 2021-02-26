import React from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext.js';
import { getInputErrors, getInputFieldErrorClassName } from '../utils/utils.js';
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ errors, setErrors ] = React.useState({});

  const currentUser = React.useContext(CurrentUserContext);

  const fieldNames = {
    profileName: 'profile-name',
    profileDescription: 'profile-description'
  }
  const nameFieldErrorClassName = getInputFieldErrorClassName(errors, fieldNames.profileName);
  const descriptionFieldErrorClassName = getInputFieldErrorClassName(errors, fieldNames.profileDescription);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleInputChange({ target }) {
    switch(target.name) {
      case fieldNames.profileName:
        setName(target.value);
        break;
      case fieldNames.profileDescription:
        setDescription(target.value);
        break;
    }

    setErrors(getInputErrors(errors, target));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm name="profile-edit" title="Edit profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="project-form__field-wrapper project-form__field-wrapper_form_profile-edit">
        <input 
          type="text"
          aria-label="Name"
          name={fieldNames.profileName}
          className={"project-form__input project-form__input_type_profile-edit-field"}
          placeholder="Name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleInputChange}
          required
        />
        <p className={nameFieldErrorClassName}>{errors[fieldNames.profileName]}</p>
      </div>
      <div className="project-form__field-wrapper project-form__field-wrapper_form_profile-edit">
        <input
          type="text"
          aria-label="About me"
          name={fieldNames.profileDescription}
          className="project-form__input project-form__input_type_profile-edit-field"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleInputChange}
          required
        />
        <p className={descriptionFieldErrorClassName}>{errors[fieldNames.profileDescription]}</p>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

