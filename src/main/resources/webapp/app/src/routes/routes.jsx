import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../components/layouts/header/header-components";
import AthleteClassification from "../pages/classification-function/athlete-classification";
import Rankings from "../pages/rankings/rankings";
import Login from "../pages/account/login/login";
import Register from "../pages/account/register/register";
import Athlete from "../pages/athlete/athlete";
import AthleteDetail from "../pages/athlete/athlete-detail";
import AthleteUpdate from "../pages/athlete/athlete-update";
import PsychophysiologyFactorChart from "../pages/charts/psychophysiology-factor-chart";
import FormFactorChart from "../pages/charts/form-factor-chart";
import TechnicalFactorChart from "../pages/charts/technical-factor-chart";
import PhysicalFactorChart from "../pages/charts/physical-factor-chart";
import Form from "../pages/factors/form/form";
import FormFactorDetail from "../pages/factors/form/form-detail";
import FormFactorUpdate from "../pages/factors/form/form-update";
import Physical from "../pages/factors/physical/physical";
import PhysicalFactorDetail from "../pages/factors/physical/physical-detail";
import PhysicalFactorUpdate from "../pages/factors/physical/physical-update";
import Psychophysiology from "../pages/factors/psychophysiology/psychophysiology";
import PsychophysiologyFactorDetail from "../pages/factors/psychophysiology/psychophysiology-detail";
import PsychophysiologyFactorUpdate from "../pages/factors/psychophysiology/psychophysiology-update";
import Technical from "../pages/factors/technical/technical";
import TechnicalFactorDetail from "../pages/factors/technical/technical-detail";
import TechnicalFactorUpdate from "../pages/factors/technical/technical-update";
import User from "../pages/user-management/user";
import UserUpdate from "../pages/user-management/user-update";
import UserDetail from "../pages/user-management/user-detail";
import Profile from "../pages/account/profile/profile";
import ProfileUpdate from "../pages/account/profile/profile-update";
import { AthleteDeleteDialog } from "../pages/athlete/athlete-delete-dialog";
import { FormFactorDeleteDialog } from "../pages/factors/form/form-delete-dialog";
import { PhysicalFactorDeleteDialog } from "../pages/factors/physical/physical-delete-dialog";
import { PsychophysiologyFactorDeleteDialog } from "../pages/factors/psychophysiology/psychophysiology-delete-dialog";
import { TechnicalFactorDeleteDialog } from "../pages/factors/technical/technical-delete-dialog";
import { UserDeleteDialog } from "../pages/user-management/user-delete-dialog";

export default function Routes() {

  return(
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route
          path="/athlete-classification"
          component={AthleteClassification}
          exact
        />
        <Route path="/rankingsList" component={Rankings} exact />

        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/profile/:id" component={Profile} exact />
        <Route path="/profile/:id/edit" component={ProfileUpdate} exact />


        <Route path="/users" component={User} exact />
        <Route path="/users/:id/detail" component={UserDetail} exact />
        <Route path="/users/new" component={UserUpdate} exact />
        <Route path="/users/:id/edit" component={UserUpdate} exact />
        <Route path="/users/:id/delete" component={UserDeleteDialog} exact />


        <Route path="/athletes" component={Athlete} exact />
        <Route path="/athletes/:id/detail" component={AthleteDetail} exact />
        <Route path="/athletes/new" component={AthleteUpdate} exact />
        <Route path="/athletes/:id/edit" component={AthleteUpdate} exact />
        <Route path="/athletes/:id/delete" component={AthleteDeleteDialog} exact />

        <Route path="/physicalFactorChart" component={PhysicalFactorChart} exact />
        <Route path="/technicalFactorChart" component={TechnicalFactorChart} exact />
        <Route path="/psychophysiologyFactorChart" component={PsychophysiologyFactorChart} exact />
        <Route path="/formFactorChart" component={FormFactorChart} exact />
        
        <Route path="/formFactors" component={Form} exact/>
        <Route path="/formFactors/:id/detail" component={FormFactorDetail} exact />
        <Route path="/formFactors/new" component={FormFactorUpdate} exact/>
        <Route path="/formFactors/:id/edit" component={FormFactorUpdate} exact/>
        <Route path="/formFactors/:id/delete" component={FormFactorDeleteDialog} exact/>
        
        <Route path="/physicalFactors" component={Physical} exact />
        <Route path="/physicalFactors/:id/detail" component={PhysicalFactorDetail} exact />
        <Route path="/physicalFactors/new" component={PhysicalFactorUpdate} exact/>
        <Route path="/physicalFactors/:id/edit" component={PhysicalFactorUpdate} exact/>
        <Route path="/physicalFactors/:id/delete" component={PhysicalFactorDeleteDialog} exact/>

        <Route path="/psychophysiologyFactors" component={Psychophysiology} exact />
        <Route path="/psychophysiologyFactors/:id/detail" component={PsychophysiologyFactorDetail} exact />
        <Route path="/psychophysiologyFactors/new" component={PsychophysiologyFactorUpdate} exact/>
        <Route path="/psychophysiologyFactors/:id/edit" component={PsychophysiologyFactorUpdate} exact/>
        <Route path="/psychophysiologyFactors/:id/delete" component={PsychophysiologyFactorDeleteDialog} exact/>

        <Route path="/technicalFactors" component={Technical} exact />
        <Route path="/technicalFactors/:id/detail" component={TechnicalFactorDetail} exact />
        <Route path="/technicalFactors/new" component={TechnicalFactorUpdate} exact/>
        <Route path="/technicalFactors/:id/edit" component={TechnicalFactorUpdate} exact/>
        <Route path="/technicalFactors/:id/delete" component={TechnicalFactorDeleteDialog} exact/>


        <Route component={Error} />
      </Switch>
    </>
  );
}