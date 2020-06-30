import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = React.forwardRef((props, ref) => {
  return (
    <NavLink
      to={props.path}
      className="side-nav-link"
      ref={(el) => (ref.current[props.index] = el)}
    >
      <div className="squares-container">
        <span className="small-square"></span>
        <span className="small-square"></span>
        <span className="small-square"></span>
      </div>
      <div className="text-assistant">
        <span className="icon-container">
          <i className={props.icon}></i>
        </span>
        <span className="side-nav-text">{props.text}</span>
      </div>
    </NavLink>
  );
});

export default SidebarLink;
