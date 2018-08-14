import React from "react";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <div className="kata-link-container">
      <ul>
        <li>
          <Link to="/carousel">Carousel</Link>
        </li>
      </ul>
    </div>
  )
}

export default Landing;