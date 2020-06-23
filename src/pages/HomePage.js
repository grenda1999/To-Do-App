import React from "react";
import { Route, Switch } from "react-router-dom";

import SamplePage from "./SamplePage";
import ErrorPage from "./ErrorPage";
import Sidebar from "../layouts/Sidebar";

const HomePage = ({ match }) => {
  return (
    <>
      <aside>
        <Sidebar match={match.url} />
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
