import React from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext.js';
import { getInputErrors, getInputFieldErrorClassName } from '../utils/utils.js';
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');
  const [ errors, setErrors ] = React.useState({});
  const [ isSubmitBtnDisabled, setIsSubmitBtnDisabled ] = React.useState(true);

  const currentUser = React.useContext(CurrentUserContext);

  const fieldNames = {
    profileName: 'profile-name',
    profileDescription: 'profile-description'
  }
  const nameFieldErrorClassName = getInputFieldErrorClassName(errors, fieldNames.profileName);
  const descriptionFieldErrorClassName = getInputFieldErrorClassName(errors, fieldNames.profileDescription);

  const PROFILE_NAME_MAX_LENGTH = 40;
  const PROFILE_NAME_MIN_LENGTH = 2;
  const PROFILE_DESCRIPTION_MAX_LENGTH = 200;
  const PROFILE_DESCRIPTION_MIN_LENGTH = 2;

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  React.useEffect(() => {
    checkIfSubmitBtnShouldBeDisabled();
  }, [name, description]);

  function checkIfSubmitBtnShouldBeDisabled() {
    setIsSubmitBtnDisabled(
      name.length < PROFILE_NAME_MIN_LENGTH ||
      name.length > PROFILE_NAME_MAX_LENGTH ||
      description.length < PROFILE_NAME_MIN_LENGTH ||
      description.length > PROFILE_DESCRIPTION_MAX_LENGTH
    );
  }

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

  function handleBlur({ target }) {
    setErrors(getInputErrors(errors, target));
    checkIfSubmitBtnShouldBeDisabled();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="profile-edit" 
      title="Edit profile" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      isSubmitBtnDisabled={isSubmitBtnDisabled}
    >
      <div className="project-form__field-wrapper project-form__field-wrapper_form_profile-edit">
        <input 
          type="text"
          aria-label="Name"
          name={fieldNames.profileName}
          className={"project-form__input project-form__input_type_profile-edit-field"}
          placeholder="Name"
          minLength={PROFILE_NAME_MIN_LENGTH}
          maxLength={PROFILE_NAME_MAX_LENGTH}
          value={name}
          onChange={handleInputChange}
          onBlur={handleBlur}
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
          minLength={PROFILE_DESCRIPTION_MIN_LENGTH}
          maxLength={PROFILE_DESCRIPTION_MAX_LENGTH}
          value={description}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        <p className={descriptionFieldErrorClassName}>{errors[fieldNames.profileDescription]}</p>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

