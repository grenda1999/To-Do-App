import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

const list = [
  { name: "home", path: "/home" },
  { name: "guide", path: "/guide" },
];

let comparison = null;

const Navigation = () => {
  const divUnderline = useRef(null);

  function handleUnderline(e) {
    if (e.type === "mousedown") {
      comparison = e.target;
    } else {
      let self = e.target;
      if (e.type === "mouseout") {
        comparison = null;
      } else {
        if (!self.classList.contains("active") && Object.is(self, comparison)) {
          divUnderline.current.animate(
            [
              { left: `${divUnderline.current.offsetLeft}px` },
              { left: `${self.offsetLeft}px` },
            ],
            {
              duration: 200,
              easing: "ease-in",
              fill: "forwards",
            }
          );
        }
      }
    }
  }

  // *************** Mount - fix underline ***************
  useEffect(() => {
    const pathname = window.location.pathname;
    const pathElement = document.querySelector(`a[href="${pathname}"]`);
    if (pathElement) {
      divUnderline.current.style.left = `${pathElement.offsetLeft}px`;
    }
  }, []);
  // *************** End mount - fix underline ***************

  const menu = list.map((item) => (
    <NavLink
      key={item.name}
      onMouseDown={handleUnderline}
      onMouseUp={handleUnderline}
      onMouseOut={handleUnderline}
      to={item.path}
      exact={item.exact ? item.exact : false}
    >
      {item.name}
    </NavLink>
  ));

  return (
    <div className="container-fluid">
      <nav className="main-nav">
        <div className="positioning-assistant">
          {menu}
          <div className="underline" ref={divUnderline}></div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
