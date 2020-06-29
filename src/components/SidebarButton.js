import React from "react";

const SidebarButton = React.forwardRef((props, ref) => {
  return (
    <div className="side-nav-button" onClick={props.click}>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span className="hamburger-line"></span>
      <span
        className="button-border"
        ref={(el) => (ref.current[0] = el)}
      ></span>
      <span
        className="button-border"
        ref={(el) => (ref.current[1] = el)}
      ></span>
      <span
        className="button-border"
        ref={(el) => (ref.current[2] = el)}
      ></span>
    </div>
  );
});

export default SidebarButton;
