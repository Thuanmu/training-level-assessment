import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import AthleteClassification from "./components/classification-function/athlete-classification";
import Athlete from "./components/athlete/athlete";
import AthleteDetail from "./components/athlete/athlete-detail";
import AthleteUpdate from "./components/athlete/athlete-update";
import Form from "./components/factors/form/form";
import FormFactorUpdate from "./components/factors/form/form-update";
import Physical from "./components/factors/physical/physical";
import PhysicalFactorUpdate from "./components/factors/physical/physical-update";
import Psychophysiology from "./components/factors/psychophysiology/psychophysiology";
import PsychophysiologyFactorUpdate from "./components/factors/psychophysiology/psychophysiology-update";
import Technical from "./components/factors/technical/technical";
import TechnicalFactorUpdate from "./components/factors/technical/technical-update";
import Footer from "./components/layout/footer/footer";
import Header from "./components/layout/header/header";
import { Home } from "./components/layout/header/header-components";
import Rankings from "./components/rankings/rankings";
import FormFactorDetail from "./components/factors/form/form-detail";
import PhysicalFactorDetail from "./components/factors/physical/physical-detail";
import PsychophysiologyFactorDetail from "./components/factors/psychophysiology/psychophysiology-detail";
import TechnicalFactorDetail from "./components/factors/technical/technical-detail";


function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/athlete-classification" component={AthleteClassification} exact />
        <Route path="/rankingsList" component={Rankings} exact />
        
        
        {/*form*/}
        <Route path="/formFactors" component={Form} exact/>
        <Route path="/formFactors/:id/detail" component={FormFactorDetail} exact />
        <Route path="/formFactors/new" component={FormFactorUpdate} exact/>
        <Route path="/formFactors/:id/edit" component={FormFactorUpdate} exact/>
        {/* athlete */}
        <Route path="/athletes" component={Athlete} exact />
        <Route path="/athletes/:id/detail" component={AthleteDetail} exact />
        <Route path="/athletes/:new" component={AthleteUpdate} exact/>
        <Route path="/athletes/:id/edit" component={AthleteUpdate} exact/>
        {/* technicalFactor */}
        <Route path="/technicalFactors" component={Technical} exact />
        <Route path="/technicalFactors/:id/detail" component={TechnicalFactorDetail} exact />
        <Route path="/technicalFactors/:new" component={TechnicalFactorUpdate} exact/>
        <Route path="/technicalFactors/:id/edit" component={TechnicalFactorUpdate} exact/>
        {/* physicalFactor */}
        <Route path="/physicalFactors" component={Physical} exact />
        <Route path="/physicalFactors/:id/detail" component={PhysicalFactorDetail} exact />
        <Route path="/physicalFactors/:new" component={PhysicalFactorUpdate} exact/>
        <Route path="/physicalFactors/:id/edit" component={PhysicalFactorUpdate} exact/>
        {/* psychophysiologyFactor */}
        <Route path="/psychophysiologyFactors" component={Psychophysiology} exact />
        <Route path="/psychophysiologyFactors/:id/detail" component={PsychophysiologyFactorDetail} exact />
        <Route path="/psychophysiologyFactors/:new" component={PsychophysiologyFactorUpdate} exact/>
        <Route path="/psychophysiologyFactors/:id/edit" component={PsychophysiologyFactorUpdate} exact/>

        <Route component={Error} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
