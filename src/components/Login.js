import React from 'react';
import { Link } from 'react-router-dom';
import UserAuthForm from './UserAuthForm';

function Login(props) {
  const { isLoggingIn, onLogin, onLoginPage } = props;
  React.useEffect(() => {
    onLoginPage(true);
    return () => onLoginPage(false);
  }, []);
  const redirectionInfo = (
    <>
      Not a member yet? Sign up {" "}
      <Link to="/signup" className="project-user-auth-form-container__link">
        here
      </Link>!
    </>
  );

  return (
    <UserAuthForm
      name="user-auth"
      title="Log in"
      submitBtnText={isLoggingIn ? 'Logging in' : 'Log in'}
      isProcessing={isLoggingIn} 
      redirectionInfo={redirectionInfo}
      onUserAuth={onLogin}
    />
  );
}

export default Login;