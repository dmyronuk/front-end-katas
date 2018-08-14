import React from "react";
import {Link} from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header-top">
      <Link to="/">
        UI Katas
      </Link>
    </header>
  )
}

export default Header;