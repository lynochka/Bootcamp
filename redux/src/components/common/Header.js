import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const style = ({ isActive }) => ({ color: isActive ? "#F15B2A" : "blue" });
  return (
    <nav>
      <NavLink to="/" style={style} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" style={style}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/about" style={style}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
