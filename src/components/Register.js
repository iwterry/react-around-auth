import React from 'react';
import { Link } from 'react-router-dom';
import RegisterOrLogin from './RegisterOrLogin';

function Register(props) {
  const { onRegister, isRegistering, onRegistrationPage } = props;
  React.useEffect(() => {
    onRegistrationPage(true);
    return () => onRegistrationPage(false);
  }, []);
  const redirectionInfo = (
    <>
      Already a member? Log in {" "}
      <Link to="/signin" className="project-reg-and-login-form-container__link">
        here
      </Link>!
    </>
  );

  return (
    <RegisterOrLogin
      name="user-reg-and-login"
      title="Sign up"
      submitBtnText={isRegistering ? 'Signing up' : 'Sign up'}
      redirectionInfo={redirectionInfo}
      isRegisteringOrLoggingIn={isRegistering}
      onRegisterOrLogin={onRegister}
    />
  );
}

export default Register;