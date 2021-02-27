import React from 'react';
import { getInputErrors, getInputFieldErrorClassName } from '../utils/utils';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isCreatingPlace } = props;

  const [ title, setTitle ] = React.useState('');
  const [ link, setLink ] = React.useState(''); 
  const [ errors, setErrors ] = React.useState({});
  const [ hasUserChangedInput, setHasUserChangedInput ] = React.useState(false);


  const fieldNames = {
    placeTitle: 'location-title',
    placeLink: 'location-link'
  }
  const titleFieldErrorClassName = getInputFieldErrorClassName(
    errors, 
    fieldNames.placeTitle, 
    isOpen
  );
  const linkFieldErrorClassName = getInputFieldErrorClassName(
    errors, 
    fieldNames.placeLink, 
    isOpen
  );
  const hasInvalidInput = (  
    errors.hasOwnProperty(fieldNames.placeTitle) ||
    errors.hasOwnProperty(fieldNames.placeLink)
  );
  const isSubmitBtnDisabled = (
    !hasUserChangedInput ||
    isCreatingPlace ||
    hasInvalidInput || 
    !isOpen
  );

  
  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(title, link);

    setTitle('');
    setLink('');
  }

  function validateInput(inputElement) {
    setErrors(getInputErrors(errors, inputElement));
  }

  function handleInputChange({ target: inputElement }) {
    switch(inputElement.name) {
      case fieldNames.placeTitle:
        setTitle(inputElement.value);
        break;
      case fieldNames.placeLink:
        setLink(inputElement.value);
        break;
    }

    setHasUserChangedInput(true);
  }

  function handleBlur({ target: inputElement }) {
    validateInput(inputElement);
  }


  return (
    <PopupWithForm 
      name="location-create" 
      title="New place" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      isSubmitBtnDisabled={isSubmitBtnDisabled}
      submitBtnText={isCreatingPlace ? 'Saving' : 'Save'}
    >
      <div className="project-form__field-wrapper project-form__field-wrapper_form_location-create">
        <input 
          type="text"
          aria-label="Title"
          name={fieldNames.placeTitle}
          className="project-form__input project-form__input_type_location-create-field"
          placeholder="Title"
          minLength="2"
          maxLength="30"
          value={title}
          onChange={handleInputChange}
          onBlur={handleBlur}
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
          value={link}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
        <p className={linkFieldErrorClassName}>{errors[fieldNames.placeLink]}</p>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;