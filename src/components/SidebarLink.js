import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = React.forwardRef((props, ref) => {
  return (
    <NavLink
      to={props.path}
      className="side-nav-link"
      ref={(el) => (ref.current[props.index] = el)}
    >
      <div className="square-container">
        <span className="small-square"></span>
        <span className="small-square"></span>
        <span className="small-square"></span>
      </div>
      <i className={props.icon}></i>
      <span className="side-nav-text">{props.text}</span>
    </NavLink>
  );
});

export default SidebarLink;
