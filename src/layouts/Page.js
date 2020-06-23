import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "../pages/HomePage";
import GuidePage from "../pages/GuidePage";
import ErrorPage from "../pages/ErrorPage";

const list = [
  { path: "/home", component: HomePage },
  { path: "/guide", component: GuidePage },
  { path: "", component: ErrorPage },
];

const Page = () => {
  const routes = list.map((item) => (
    <Route
      key={item.path}
      path={item.path}
      exact={item.exact ? item.exact : false}
      component={item.component}
    />
  ));

  return (
    <>
      <Switch>
        <Redirect exact from="/" to="home/board" />
        <Redirect exact from="/home" to="home/board" />
        {routes}
      </Switch>
    </>
  );
};

export default Page;
