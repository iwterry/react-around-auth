import React from 'react';
import { logErrors } from '../utils/utils';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;
  const [ title, setTitle ] = React.useState('');
  const [ link, setLink ] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(title, link);

    setTitle('');
    setLink('');
  }

  function handleInputChange({ target }) {
    switch(target.name) {
      case 'title':
        setTitle(target.value);
      case 'link':
        setLink(target.value);
      default:
        logErrors(new Error('Different value found for "name" attribute of form input field than what is expected.'));
    }
  }

  return (
    <PopupWithForm name="location-create" title="New place" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="project-form__field-wrapper project-form__field-wrapper_form_location-create">
        <input 
          type="text"
          aria-label="Title"
          name="title"
          className="project-form__input project-form__input_type_location-create-field"
          placeholder="Title"
          minLength="2"
          maxLength="30"
          onChange={handleInputChange}
          required
        />
        <p className="project-form__input-error project-form__input-error_field_location-title-input"></p>
      </div>
      <div className="project-form__field-wrapper project-form__field-wrapper_form_location-create">
        <input
          type="url"
          aria-label="Image link"
          name="link"
          className="project-form__input project-form__input_type_location-create-field"
          placeholder="Image link"
          onChange={handleInputChange}
          required
        />
        <p className="project-form__input-error project-form__input-error_field_location-image-link-input"></p>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;