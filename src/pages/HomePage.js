import React from "react";
import { Route, Switch } from "react-router-dom";

import SamplePage from "../subpages/SamplePage";
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
      windowWidth <= 767
    ) {
      sBarCntMount.classList.remove("side-nav-width-animation");
      // sBarCntMount.classList.add("side-nav-height-animation");
      btnBordersMount.forEach((border) => {
        border.classList.toggle("button-border-rotate-animation");
      });
      linksMount.forEach((sBarLink) => {
        const linkText = sBarLink.lastChild.lastChild;
        linkText.classList.remove("link-text-animation-desktop");
        // linkText.classList.add("link-text-animation-mobile");
        // linkText.style.display = "none";
      });
    } else if (
      windowWidth > 767 &&
      sBarCntMount.classList.contains("side-nav-height-animation")
    ) {
      sBarCntMount.classList.remove("side-nav-height-animation");
      // sBarCntMount.classList.add("side-nav-width-animation");
      btnBordersMount.forEach((border) => {
        border.classList.toggle("button-border-rotate-animation");
      });
      linksMount.forEach((sBarLink) => {
        const linkText = sBarLink.lastChild.lastChild;
        linkText.classList.remove("link-text-animation-mobile");
        // linkText.classList.add("link-text-animation-desktop");
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
        <div className="container">
          <div className="row">
            <Switch>
              <Route
                path={`${match.url}/:number`}
                exact={true}
                component={SamplePage}
              />
              <Route path={""} component={ErrorPage} />
            </Switch>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
