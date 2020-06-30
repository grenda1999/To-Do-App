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

const sqrsCnt = { flag: true, timer: null };

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
      const container = sBarLink.lastChild;
      const textElement = container.lastChild;
      if (windowWidth > 768) {
        textElement.classList.toggle("link-text-animation-desktop");
      } else {
        textElement.classList.toggle("link-text-animation-mobile");
      }
    });
  }

  const memoWindowResizeWrapper = useCallback(() => {
    props.resize(sBarContainer, sBarLinks, sBarButtonBorders, sqrsCnt);
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
