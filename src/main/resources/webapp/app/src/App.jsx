import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import AthleteClassification from "./components/athlete-classification";
import Form from "./components/factors/form";
import Physical from "./components/factors/physical";
import Psychophysiology from "./components/factors/psychophysiology";
import Technical from "./components/factors/technical ";
import Footer from "./components/layout/footer/footer";
import Header from "./components/layout/header/header";
import { Home } from "./components/layout/header/header-components";
import Rankings from "./components/rankings";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/athlete-classification" component={AthleteClassification} exact />
        <Route path="/rankings" component={Rankings} exact />
        <Route path="/physical" component={Physical} exact />
        <Route path="/technical" component={Technical} exact />
        <Route path="/psychophysiology" component={Psychophysiology} exact />
        <Route path="/form" component={Form} exact />
        <Route component={Error} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
