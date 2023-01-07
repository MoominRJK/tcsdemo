import React, {Component} from 'react';
import {isOrganizator, isParticipant} from "../../../../Authentication";
import SurveyQuestions from "./SurveyQuestions";
import EventSurveyForm from "../../Forms/EventSurveyForm";
import {withRouter} from "react-router-dom";
import axios from "axios";
class EventSurvey extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        surveyQuestionCountOfEvent : 0,
        isParticipantAlreadyJoined : false,
    }

    componentDidMount = () =>  {
        const {event} = this.props;
        this.isEventHaveSurveyQuestions();
        if(isParticipant()){
            this.isParticipantAlreadyJoinedTo(event);
        }

    }

    isEventHaveSurveyQuestions = () => {
        const {eventSurveyQuestions} = this.props.event;
        this.setState({
            surveyQuestionCountOfEvent : eventSurveyQuestions.length,
        })
    }

    isParticipantAlreadyJoinedTo = async (event) =>{
        var participantUsername = localStorage.getItem("username");
        const response = await axios.post(`/isJoinedBefore/${participantUsername}`,
            event, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
        this.setState({
            isParticipantAlreadyJoined : response.data
        })

    }

    isEventAlreadyFinished = () =>{
        var endDate = new Date(this.props.event.endDate);
        var currentDate = new Date();
        return currentDate >= endDate;
    }

    isEventAlreadyStarted = () =>{
        var startDate = new Date(this.props.event.startDate);
        var currentDate = new Date();
        return currentDate >= startDate;
    }


    render() {
        const {isParticipantAlreadyJoined,surveyQuestionCountOfEvent} = this.state;
        return (
            <div>
                {((isOrganizator()) && this.isEventAlreadyFinished()) ?
                    <p>You cannot create a poll because this event has ended</p> : null}
                {((isOrganizator()) && surveyQuestionCountOfEvent == 0  && !this.isEventAlreadyStarted()) ?
                   <EventSurveyForm event = {this.props.event}/>: null}
                {(isOrganizator() && surveyQuestionCountOfEvent > 0) ?
                    <p>You can view the survey and survey results of the event from the top menu.</p>
                    : null }
                {(isParticipantAlreadyJoined && isParticipant())  ?
                    <SurveyQuestions event ={this.props.event}></SurveyQuestions>
                    : null
                }
                {(isParticipant() && !isParticipantAlreadyJoined) ?
                    <p>Only users who have participated in the event can view this survey.</p>
                    : null
                }
            </div>
        );
    }
}

export default withRouter(EventSurvey);

/*
  {(isParticipantAlreadyJoined && isParticipant() && !this.isEventAlreadyFinished())  ?
                     <p>You can fill out this survey after the event is over.</p>
                    : null
                }

 */