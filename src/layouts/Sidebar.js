import React, { useEffect } from "react";
import { useRef } from "react";

import SidebarLink from "../components/SidebarLink";
import SidebarButton from "../components/SidebarButton";
import { useCallback } from "react";

const linksSettings = [
  { path: "/board", icon: "icon-link", text: "Empty" },
  { path: "/2", icon: "icon-link", text: "Empty" },
  { path: "/3", icon: "icon-link", text: "Empty" },
  { path: "/4", icon: "icon-link", text: "Empty" },
];

const sqrsCntsFlag = { flag: true };

const Sidebar = (props) => {
  const sBarContainer = useRef(null);
  const sBarButtonBorders = useRef([]);
  const sBarLinks = useRef([]);

  function handleClickAnimation() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 768) {
      sBarContainer.current.classList.add("activated-width");
      sBarContainer.current.classList.toggle("side-nav-width-animation");
    } else {
      sBarContainer.current.classList.add("activated-height");
      sBarContainer.current.classList.toggle("side-nav-height-animation");
    }

    sBarButtonBorders.current.forEach((border) => {
      border.classList.toggle("button-border-rotate-animation");
    });

    sBarLinks.current.forEach((sBarLink) => {
      const displayValue = !sBarLink.lastChild.style.display
        ? "none"
        : sBarLink.lastChild.style.display;
      sBarLink.lastChild.style.display =
        displayValue === "none" ? "initial" : "none";
      if (windowWidth > 768) {
        sBarLink.lastChild.animate(
          [
            { left: `${-15}px`, opacity: 0 },
            { left: `${0}px`, opacity: 1 },
          ],
          {
            duration: 400,
            easing: "ease-in",
            fill: "forwards",
          }
        );
      } else {
        sBarLink.lastChild.animate(
          [
            { top: `${-15}px`, opacity: 0 },
            { top: `${0}px`, opacity: 1 },
          ],
          {
            duration: 400,
            easing: "ease-in",
            fill: "forwards",
          }
        );
      }
    });
  }

  const memoWindowResizeWrapper = useCallback(() => {
    props.resize(sBarContainer, sBarLinks, sBarButtonBorders, sqrsCntsFlag);
  }, [props]);

  useEffect(() => {
    window.addEventListener("resize", memoWindowResizeWrapper);
    return () => {
      window.removeEventListener("resize", memoWindowResizeWrapper);
    };
  }, [memoWindowResizeWrapper]);

  const links = linksSettings.map((link, index) => (
    <SidebarLink
      key={link.path}
      path={props.match + link.path}
      icon={link.icon}
      text={link.text}
      index={index}
      ref={sBarLinks}
    />
  ));

  return (
    <div className="side-nav" ref={sBarContainer}>
      <div className="beat-animation-assistant">
        <SidebarButton click={handleClickAnimation} ref={sBarButtonBorders} />
      </div>
      <div className="side-nav-links-assistant">{links}</div>
    </div>
  );
};

export default Sidebar;
