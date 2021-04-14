import React from 'react';
import { Link } from 'react-router-dom';
import UserAuthForm from './UserAuthForm';

function Register(props) {
  const { onRegister, isRegistering, onRegistrationPage } = props;
  React.useEffect(() => {
    onRegistrationPage(true);
    return () => onRegistrationPage(false);
  }, []);
  const redirectionInfo = (
    <>
      Already a member? Log in {" "}
      <Link to="/signin" className="project-user-auth-form-container__link">
        here
      </Link>!
    </>
  );

  return (
    <UserAuthForm
      name="user-auth"
      title="Sign up"
      submitBtnText={isRegistering ? 'Signing up' : 'Sign up'}
      redirectionInfo={redirectionInfo}
      isProcessing={isRegistering}
      onUserAuth={onRegister}
    />
  );
}

export default Register;