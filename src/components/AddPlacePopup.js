import React from 'react';
import { getInputErrors, getInputFieldErrorClassName } from '../utils/utils';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isCreatingPlace } = props;

  const [ errors, setErrors ] = React.useState({});
  const [ isSubmitBtnDisabled, setIsSubmitBtnDisabled ] = React.useState(true);

  const titleInputRef = React.useRef({value: ''});
  const linkInputRef = React.useRef({value: ''});

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


  React.useEffect(() => {
    checkIfSubmitBtnShouldBeDisabled();
  }, [isCreatingPlace, isOpen]);

  function checkIfSubmitBtnShouldBeDisabled() {
    const hasInvalidInput = (  
      !titleInputRef.current.validity.valid ||
      !linkInputRef.current.validity.valid
    );

    setIsSubmitBtnDisabled(isCreatingPlace || hasInvalidInput || !isOpen);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(titleInputRef.current.value, linkInputRef.current.value);

    titleInputRef.current.value = '';
    linkInputRef.current.value = '';
  }

  function handleInputValidation({ target }) {
    setErrors(getInputErrors(errors, target));
    checkIfSubmitBtnShouldBeDisabled();
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