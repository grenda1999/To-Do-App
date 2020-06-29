import React from "react";
import { Route, Switch } from "react-router-dom";

import SamplePage from "./SamplePage";
import ErrorPage from "./ErrorPage";
import Sidebar from "../layouts/Sidebar";

const HomePage = ({ match }) => {
  function handleResize(sidebarCnt, sBarLinks, sBarBtnBorders, sqrCntFlag) {
    const sBarCntMount = sidebarCnt.current;
    const linksMount = sBarLinks.current;
    const btnBordersMount = sBarBtnBorders.current;
    const squaresContainers = linksMount.map((link) => link.firstChild);
    let resizeEndTimer = null;

    if (window.location.pathname.startsWith("/home")) {
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
          sBarLink.lastChild.style.display = "none";
        });
      } else if (
        sBarCntMount.classList.contains("side-nav-height-animation") &&
        windowWidth > 768
      ) {
        sBarCntMount.classList.remove("side-nav-height-animation");
        btnBordersMount.forEach((border) => {
          border.classList.toggle("button-border-rotate-animation");
        });
        linksMount.forEach((sBarLink) => {
          sBarLink.lastChild.style.display = "none";
        });
      }
      sBarCntMount.classList.remove("activated-width");
      sBarCntMount.classList.remove("activated-height");
      if (sqrCntFlag.flag) {
        squaresContainers.forEach((squaresContainer) => {
          squaresContainer.style.display = "none";
        });
        sqrCntFlag.flag = false;
      }
      resizeEndTimer = setTimeout(() => {
        squaresContainers.forEach((squaresContainer) => {
          squaresContainer.style.display = "flex";
        });
        clearTimeout(resizeEndTimer);
        sqrCntFlag.flag = true;
      }, 100);
    }
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
