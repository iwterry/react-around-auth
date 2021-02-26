import React from 'react';
import { getInputErrors, getInputFieldErrorClassName } from '../utils/utils';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;

  const [ errors, setErrors ] = React.useState({});
  const [ isSubmitBtnDisabled, setIsSubmitBtnDisabled ] = React.useState(true);

  const titleInputRef = React.useRef();
  const linkInputRef = React.useRef();

  const fieldNames = {
    placeTitle: 'location-title',
    placeLink: 'location-link'
  }
  const titleFieldErrorClassName = getInputFieldErrorClassName(errors, fieldNames.placeTitle);
  const linkFieldErrorClassName = getInputFieldErrorClassName(errors, fieldNames.placeLink);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(titleInputRef.current.value, linkInputRef.current.value);

    titleInputRef.current.value = '';
    linkInputRef.current.value = '';
  }

  function handleInputValidation({ target }) {
    setErrors(getInputErrors(errors, target));
    setIsSubmitBtnDisabled(
      !titleInputRef.current.validity.valid ||
      !linkInputRef.current.validity.valid
    );
  }

  return (
    <PopupWithForm 
      name="location-create" 
      title="New place" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      isSubmitBtnDisabled={isSubmitBtnDisabled}
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
          ref={titleInputRef}
          onChange={handleInputValidation}
          onBlur={handleInputValidation}
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
          ref={linkInputRef}
          onChange={handleInputValidation}
          onBlur={handleInputValidation}
          required
        />
        <p className={linkFieldErrorClassName}>{errors[fieldNames.placeLink]}</p>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;