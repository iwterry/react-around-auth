import React from 'react';
import { getInputErrors, getInputFieldErrorClassName } from '../utils/utils';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;
  const [ title, setTitle ] = React.useState('');
  const [ link, setLink ] = React.useState('');
  const [ errors, setErrors ] = React.useState({});

  const fieldNames = {
    placeTitle: 'location-title',
    placeLink: 'location-link'
  }
  const titleFieldErrorClassName = getInputFieldErrorClassName(errors, fieldNames.placeTitle);
  const linkFieldErrorClassName = getInputFieldErrorClassName(errors, fieldNames.placeLink);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(title, link);

    setTitle('');
    setLink('');
  }

  function handleInputChange({ target }) {
    switch(target.name) {
      case fieldNames.placeTitle:
        setTitle(target.value);
      case fieldNames.placeLink:
        setLink(target.value);
    }
    setErrors(getInputErrors(errors, target));
  }

  return (
    <PopupWithForm name="location-create" title="New place" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="project-form__field-wrapper project-form__field-wrapper_form_location-create">
        <input 
          type="text"
          aria-label="Title"
          name={fieldNames.placeTitle}
          className="project-form__input project-form__input_type_location-create-field"
          placeholder="Title"
          minLength="2"
          maxLength="30"
          onChange={handleInputChange}
          required
        />
        <p className={titleFieldErrorClassName}>{errors[fieldNames.placeTitle]}</p>
      </div>
      <div className="project-form__field-wrapper project-form__field-wrapper_form_location-create">
        <input
          type="url"
          aria-label="Image link"
          name={fieldNames.placeLink}
          className="project-form__input project-form__input_type_location-create-field"
          placeholder="Image link"
          onChange={handleInputChange}
          required
        />
        <p className={linkFieldErrorClassName}>{errors[fieldNames.placeLink]}</p>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;