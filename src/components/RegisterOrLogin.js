import React from 'react';
import { getInputErrors, getInputFieldErrorClassName } from '../utils/utils';
import Form from './Form';

function RegisterOrLogin(props) {
  const { 
    name, title, submitBtnText, onRegisterOrLogin, redirectionInfo, isRegisteringOrLoggingIn
  } = props;

  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ errors, setErrors ] = React.useState({});

  const fieldNames = {
    email: 'user-email',
    password: 'user-password'
  };
  const emailFieldErrorClassName = getInputFieldErrorClassName(
    errors, 
    fieldNames.email, 
    true
  );
  const passwordFieldErrorClassName = getInputFieldErrorClassName(
    errors,
    fieldNames.password, 
    true
  );

  const hasInvalidInput = (  
    errors.hasOwnProperty(fieldNames.email) ||
    errors.hasOwnProperty(fieldNames.password)
  );
  const isSubmitBtnDisabled = (
    hasInvalidInput ||
    isRegisteringOrLoggingIn ||
    email.trim() === '' || // necessary for when user has not entered a value for email
    password.trim() === ''  // or for password
  );
  const submitBtnClassName = `project-form__submit-btn project-form__submit-btn_type_${name}` + 
  (isSubmitBtnDisabled ? ' project-form__submit-btn_disabled' : '');

  
  function validateInput(inputElement) {
    setErrors(getInputErrors(errors, inputElement));
  }

  function handleInputChange({ target }) {
    switch(target.name) {
      case fieldNames.email:
        setEmail(target.value);
        break;
      case fieldNames.password:
        setPassword(target.value);
        break;
    }

    validateInput(target);
  }

  function handleBlur({ target }) {
    validateInput(target);
  }

  function handleRegisterOrLogin(evt) {
    evt.preventDefault();
    onRegisterOrLogin(email, password);
  }

  return (
    <main className="project-reg-and-login-form-container">
      <Form
        name={name}
        title={title}
        submitBtnText={submitBtnText}
        submitBtnClassName={submitBtnClassName}
        isSubmitBtnDisabled={isSubmitBtnDisabled}
        onSubmit={handleRegisterOrLogin}
      >
        <div className="project-form__field-wrapper project-form__field-wrapper_form_user-reg-and-login">
          <input 
            type="email"
            aria-label="Email"
            name={fieldNames.email}
            className={"project-form__input project-form__input_type_user-reg-and-login-field"}
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          <p className={emailFieldErrorClassName}>{errors[fieldNames.email]}</p>
        </div>
        <div className="project-form__field-wrapper project-form__field-wrapper_form_user-reg-and-login">
          <input
            type="password"
            aria-label="Password"
            name={fieldNames.password}
            className="project-form__input project-form__input_type_user-reg-and-login-field"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          <p className={passwordFieldErrorClassName}>{errors[fieldNames.password]}</p>
        </div>
      </Form>
      <p className="project-reg-and-login-form-container__redirection-info">
        {redirectionInfo}
      </p>
    </main>
  );
}

export default RegisterOrLogin;