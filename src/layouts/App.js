import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./Navigation";
import Footer from "./Footer";
import Page from "./Page";

const App = () => {
  return (
    <Router>
      <header>
        <Navigation />
      </header>
      <main className="content">
        <Page />
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
};

export default App;
