import React, { useEffect } from "react";
import { useRef } from "react";

import SideNavLink from "../components/SideNavLink";
import SideNavButton from "../components/SideNavButton";

const linksConfig = [
  { path: "/board", icon: "icon-link", text: "Empty" },
  { path: "/2", icon: "icon-link", text: "Empty" },
  { path: "/3", icon: "icon-link", text: "Empty" },
  { path: "/4", icon: "icon-link", text: "Empty" },
];

let resizeEndTimer = null;

let flagSquares = true;

const Sidebar = (props) => {
  const sideNav = useRef(null);
  const sideNavButtonBorders = useRef([]);
  const sideNavLinks = useRef([]);

  function handleClickAnimation() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 768) {
      sideNav.current.classList.add("activated-width");
      sideNav.current.classList.toggle("side-nav-width-animation");
    } else {
      sideNav.current.classList.add("activated-height");
      sideNav.current.classList.toggle("side-nav-height-animation");
    }

    sideNavButtonBorders.current.forEach((border) => {
      border.classList.toggle("button-border-rotate-animation");
    });

    sideNavLinks.current.forEach((sideNavLink) => {
      const displayValue = !sideNavLink.lastChild.style.display
        ? "none"
        : sideNavLink.lastChild.style.display;
      sideNavLink.lastChild.style.display =
        displayValue === "none" ? "initial" : "none";
      if (windowWidth > 768) {
        sideNavLink.lastChild.animate(
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
        sideNavLink.lastChild.animate(
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

  function resizeEnd(squaresContainers) {
    squaresContainers.forEach((squaresContainer) => {
      squaresContainer.style.display = "flex";
    });
    flagSquares = true;
  }

  useEffect(() => {
    const sideNavMount = sideNav.current;
    const linksMount = sideNavLinks.current;
    const buttonBordersMount = sideNavButtonBorders.current;
    const squaresContainers = linksMount.map((link) => link.firstChild);

    window.addEventListener("resize", () => {
      if (window.location.pathname.startsWith("/home")) {
        const windowWidth = window.innerWidth;
        if (
          sideNavMount.classList.contains("side-nav-width-animation") &&
          windowWidth <= 768
        ) {
          sideNavMount.classList.remove("side-nav-width-animation");
          buttonBordersMount.forEach((border) => {
            border.classList.toggle("button-border-rotate-animation");
          });
          linksMount.forEach((sideNavLink) => {
            sideNavLink.lastChild.style.display = "none";
          });
        } else if (
          sideNavMount.classList.contains("side-nav-height-animation") &&
          windowWidth > 768
        ) {
          sideNavMount.classList.remove("side-nav-height-animation");
          buttonBordersMount.forEach((border) => {
            border.classList.toggle("button-border-rotate-animation");
          });
          linksMount.forEach((sideNavLink) => {
            sideNavLink.lastChild.style.display = "none";
          });
        }
        sideNavMount.classList.remove("activated-width");
        sideNavMount.classList.remove("activated-height");

        if (flagSquares) {
          squaresContainers.forEach((squaresContainer) => {
            squaresContainer.style.display = "none";
            flagSquares = false;
          });
        }

        clearTimeout(resizeEndTimer);
        resizeEndTimer = setTimeout(() => {
          resizeEnd(squaresContainers);
        }, 100);
      }
    });
  }, []);

  const links = linksConfig.map((link, index) => (
    <SideNavLink
      key={link.path}
      path={props.match + link.path}
      icon={link.icon}
      text={link.text}
      index={index}
      ref={sideNavLinks}
    />
  ));

  return (
    <div className="side-nav" ref={sideNav}>
      <div className="beat-animation-assistant">
        <SideNavButton
          click={handleClickAnimation}
          ref={sideNavButtonBorders}
        />
      </div>
      <div className="side-nav-links-assistant">{links}</div>
    </div>
  );
};

export default Sidebar;
