import React from 'react';

import logo from '../images/header-vector.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Around The U.S." className="header__vector" />
    </header>
  );
}

export default Header;

