import React, {Component} from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect,browserHistory} from 'react-router-dom';
import Events from "./components/Event/Events";
import EventsAdmin from "./components/Event/EventsAdmin";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import NavigationBar from "./components/Navigation Bar";
import NotFound from "./components/static/NotFound";
import RegisterForm from "./components/Forms/RegisterForm";
import PrivateRoute from "./components/Routers/PrivateRoute";
import OrganizatorRoute from "./components/Routers/OrganizatorRoute";
import ParticipantRoute from './components/Routers/ParticipantRoute';
import AddEventForm from "./components/Event/Forms/AddEventForm";
import EventQuestionsForm from './components/Event/Forms/EventQuestionsForm'
import ParticipantEvents from "./components/Participant/ParticipantEvents";
import Event from './components/Event/Event'
import EventAdmin from './components/Event/EventAdmin'
import PrizesAdmin from './components/Prize/PrizesAdmin'
import Prizes from './components/Prize/Prizes'
import ParticipantsOfEvent from "./components/Participant/ParticipantsOfEvent";
import EventStatistics from "./components/Event/StatisticsOfEvent/EventStatistics";
import EventBarChartPoint from "./components/Event/StatisticsOfEvent/EventBarChartPoint";
import EventBarMyPoint from "./components/Event/StatisticsOfEvent/EventBarMyPoint";
import EventRaffle from "./components/Event/EventRaffle/EventRaffle";
import EventRaffleQ from "./components/Event/EventRaffle/EventRaffleQ";
import ParticipantAnswers from "./components/Participant/ParticipantAnswers";
import EventSurveyForm from "./components/Event/Forms/EventSurveyForm";
import SurveyStatistics from "./components/Event/EventInformation/EventSurvey/SurveyStatistics";
import InformationInsideOfQrCode from './components/QrCode/InformationInsideOfQrCode'

import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';



class App extends Component {
 

    render() {
        return (
            // <div className={useStyles().root}>
            // <CssBaseline />
            <Router>
                <NavigationBar/>
                <Switch>
                    {/* <Route exact path  ={"/"}><Redirect to = {"/login"}></Redirect></Route> */}
                    <Route exact path  ={"/"} component ={Home}/>
                    <Route exact path = {"/login"} component ={Login}/>
                    <Route exact path = {"/register"} component= {RegisterForm}/>
                    <PrivateRoute exact path={"/eventsAdmin"} component={EventsAdmin}/>
                    <PrivateRoute exact path={"/events"} component={Events}/>
                    
                    <PrivateRoute exact path={"/eventAdmin/:eventName"} component={EventAdmin}/>
                    <PrivateRoute exact path={"/event/:eventName"} component={Event}/>
                    <OrganizatorRoute exact path ={"/chart"} component = {EventStatistics}/>
                    <OrganizatorRoute exact path={"/events/:username"} component={AddEventForm}/>
                    <OrganizatorRoute exact path = {"/survey"} component ={SurveyStatistics}/>
                    <OrganizatorRoute exact path={"/raffle"} component={EventRaffle}/>
                    <OrganizatorRoute exact path={"/raffleQ"} component={EventRaffleQ}/>
                    <OrganizatorRoute exacth path ={"/participants/:eventName"} component ={ParticipantsOfEvent}/>
                    <OrganizatorRoute exact path ={"/event/:eventName/addQuestion"} component = {EventQuestionsForm}/>
                    <OrganizatorRoute exact path = {"/createSurvey/:eventName"} component={EventSurveyForm}/>
                    <OrganizatorRoute exact path ={"/report"} component={EventBarChartPoint}/>
                    <OrganizatorRoute exact path ={"/allPrize"} component={Prizes}/>
                    <ParticipantRoute exact path ={"/prize"} component={Prizes}/>
                    <ParticipantRoute exact path = {"/participantAnswersOf/:eventName"} component = {ParticipantAnswers}/>
                    <ParticipantRoute exact path ={"/myEvents/:username"} component={ParticipantEvents}/>
                    <ParticipantRoute exact path ={"/myReport/:username"} component={EventBarMyPoint}/>
                    <ParticipantRoute exact path ={"/:username/and/:eventName/information"}
                                      component ={InformationInsideOfQrCode}/>
                   <Route component={NotFound}/>
                </Switch>
                <Footer/>
            </Router>
            // </div>
        );
    }
}

export default App;
