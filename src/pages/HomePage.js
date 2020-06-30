import React from "react";
import { Route, Switch } from "react-router-dom";

import SamplePage from "./SamplePage";
import ErrorPage from "./ErrorPage";
import Sidebar from "../layouts/Sidebar";

const HomePage = ({ match }) => {
  function handleResize(sidebarCnt, sBarLinks, sBarBtnBorders, sqrCnt) {
    const sBarCntMount = sidebarCnt.current;
    const linksMount = sBarLinks.current;
    const btnBordersMount = sBarBtnBorders.current;
    const squaresContainers = linksMount.map((link) => link.firstChild);

    const windowWidth = window.innerWidth;
    if (
      sBarCntMount.classList.contains("side-nav-width-animation") &&
      windowWidth <= 768
    ) {
      sBarCntMount.classList.remove("side-nav-width-animation");
      btnBordersMount.forEach((border) => {
        border.classList.toggle("button-border-rotate-animation");
      });
      linksMount.forEach((sBarLink) => {
        const linkText = sBarLink.lastChild.lastChild;
        linkText.classList.remove("link-text-animation-desktop");
        // linkText.style.display = "none";
      });
    } else if (
      windowWidth > 768 &&
      sBarCntMount.classList.contains("side-nav-height-animation")
    ) {
      sBarCntMount.classList.remove("side-nav-height-animation");
      btnBordersMount.forEach((border) => {
        border.classList.toggle("button-border-rotate-animation");
      });
      linksMount.forEach((sBarLink) => {
        const linkText = sBarLink.lastChild.lastChild;
        linkText.classList.remove("link-text-animation-mobile");
        // linkText.style.display = "none";
      });
    }
    sBarCntMount.classList.remove("activated-width");
    sBarCntMount.classList.remove("activated-height");
    if (sqrCnt.flag) {
      squaresContainers.forEach((squaresContainer) => {
        squaresContainer.style.display = "none";
      });
      sqrCnt.flag = false;
    }
    clearTimeout(sqrCnt.timer);
    sqrCnt.timer = setTimeout(() => {
      squaresContainers.forEach((squaresContainer) => {
        squaresContainer.style.display = "flex";
      });
      sqrCnt.flag = true;
    }, 100);
  }

  return (
    <>
      <aside>
        <Sidebar match={match.url} resize={handleResize} />
      </aside>
      <section>
        <Switch>
          <Route
            path={`${match.url}/:number`}
            exact={true}
            component={SamplePage}
          />
          <Route path={""} component={ErrorPage} />
        </Switch>
      </section>
    </>
  );
};

export default HomePage;
