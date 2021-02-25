import React from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext.js';
import { logErrors } from '../utils/utils.js';
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;

  const [ name, setName ] = React.useState('');
  const [ description, setDescription ] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleInputChange({ target }) {
    switch(target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'description':
        setDescription(target.value);
        break;
      default:
        logErrors(new Error('Different value found for "name" attribute of form input field than what is expected.'));
    }
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
          name="name"
          className="project-form__input project-form__input_type_profile-edit-field"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleInputChange}
          required
        />
        <p className="project-form__input-error project-form__input-error_field_profile-name-input"></p>
      </div>
      <div className="project-form__field-wrapper project-form__field-wrapper_form_profile-edit">
        <input
          type="text"
          aria-label="About me"
          name="description"
          className="project-form__input project-form__input_type_profile-edit-field"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleInputChange}
          required
        />
        <p className="project-form__input-error project-form__input-error_field_profile-about-me-input"></p>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;