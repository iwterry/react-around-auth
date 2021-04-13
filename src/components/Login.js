import React from 'react';
import { Link } from 'react-router-dom';
import RegisterOrLogin from './RegisterOrLogin';

function Login(props) {
  const { isLoggingIn, onLogin, onLoginPage } = props;
  React.useEffect(() => {
    onLoginPage(true);
    return () => onLoginPage(false);
  }, []);
  const redirectionInfo = (
    <>
      Not a member yet? Sign up {" "}
      <Link to="/signup" className="project-reg-and-login-form-container__link">
        here
      </Link>!
    </>
  );

  return (
    <RegisterOrLogin 
      name="user-reg-and-login"
      title="Log in"
      submitBtnText={isLoggingIn ? 'Logging in' : 'Log in'}
      isRegisteringOrLoggingIn={isLoggingIn} 
      redirectionInfo={redirectionInfo}
      onRegisterOrLogin={onLogin}
    />
  );
}

export default Login;