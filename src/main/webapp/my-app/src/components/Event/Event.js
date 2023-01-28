import React, {Component} from 'react';
import {Card} from 'react-bootstrap'
import EventNavbar from "./EventNavbar";
import axios from 'axios';
import EventDetails from "./EventInformation/EventDetails"
import EventLocation from  "./EventInformation/EventLocation"
import EventSurvey from './EventInformation/EventSurvey/EventSurvey'
import EventQuestions from './EventInformation/EventQuestions/EventQuestions'
import EventParticipation from "./EventInformation/EventParticipation";
import {isOrganizator,isParticipant} from "../../Authentication";
import {Link} from 'react-router-dom';
import ParticipantQuestionsArea from "../Participant/ParticipantQuestionsAboutEvent/ParticipantQuestionsArea";
import {getEvent} from "../../HelperFunctions/EventHelpers";
import NotificationToOrganizator from '../NotificationToOrganizator'
import QrCode from "../QrCode/QrCode";
import CustomizedSnackbar from "../static/Snackbars/CustomizedSnackbar";

import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardOverlay,
    MDBCardImage,
    MDBContainer,
    MDBCol,
    MDBBadge, MDBIcon,
    MDBTypography,
    MDBCardBody,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn
  } from 'mdb-react-ui-kit';

class Event extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         linkContent : 'Details',
    //         event : [],
    //     }
    // }


    constructor(props) {
        super(props);
    }

    state = {
        isJoinedBefore: false,
        message : '',
        messageType : '',
        isParticipationRequest : false,
        isEventHaveQuestions : false,
        isOpenedQrCode : false,
        qrCode : '',
        isSendNotification : false,
        event : [],
    }

    setLinkContentWith = (newLink) => {
        this.setState({
            linkContent : newLink
        })
    }

    componentDidMount = async () => {
        const {eventName} = this.props.match.params;
        const response = await getEvent(eventName);
        this.setState({
          event : response.data
        })
    }

    joinEvent  = async (e) =>{
        e.preventDefault();
        var participantUsername = localStorage.getItem("username");
        const {event} = this.state;
       
        if(this.isEventFull(event)){
            this.setMessageStatesAs("Full of Activity","ERROR");
        }
        else{
            this.sendJoinRequestWith(participantUsername);
        }
    }

    sendJoinRequestWith  = async (participantUsername) => {
        const {event} = this.state;
        const response = await axios.post(`/join/${participantUsername}`,
            event, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
        this.sendEmailToParticipant();
        this.setMessageStatesAs(response.data.message,response.data.messageType);
        this.openQrCode();
        this.sendNotificationToOrganizator();

    }

    sendEmailToParticipant = async () =>{
        // var participantUsername = localStorage.getItem("username");
        // const response = await axios.post(`/sendEmail/${participantUsername}`,
        //     this.props.event, {
        //         headers : {
        //             'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
        //         }
        //     }).catch(err => {
        //     this.props.history.push("/notFound404");
        // })
    }

    setMessageStatesAs = (message,messageType) =>{
        this.setState({
            message : message,
            messageType : messageType,
            isParticipationRequest : true
        })
    }

    openQrCode = () => {
        this.setState({
            isOpenedQrCode : true
        })
    }

    sendNotificationToOrganizator = () => {
        this.setState({
            isSendNotification : true
        })

    }

    closeQrCode = () => {
        this.setState({
            isOpenedQrCode : false
        })
    }

    isEventFull = (event) =>{
        return event.quota === event.currentNumberOfPeople;
    }

    closeMessageBox = () =>{
        this.setState({
            isParticipationRequest : false,
        })
    }


    render() {

        const {linkContent,event} = this.state;
        //   const {event} = this.props;
        var participantUsername = localStorage.getItem('username');
        const {isJoinedBefore, isParticipationRequest, message, messageType} = this.state;
        return (

            <>
            <MDBCard background='dark' className='text-white'>
                <MDBCardImage overlay  src={`${process.env.PUBLIC_URL}/assets/event/${event.imageUrl}`}  alt='...' />
                <MDBCardOverlay >
                    <MDBCardTitle className='display-3 text-center mt-50'>{event.name}</MDBCardTitle>
                    <MDBCardText className='text-center'>
                    {event.description}
                    </MDBCardText>
                    {/* <MDBCardText>Last updated 3 mins ago</MDBCardText> */}
                </MDBCardOverlay>
             </MDBCard>
             
            
              <MDBContainer breakpoint="xl">
                <div className="d-flex align-items-start align-items-center mt-5 mb-3" style={{ height: "100px" }}>
                    {/* <MDBCol>

                    <h3>{event.startDate}</h3>
                    </MDBCol> */}

                    <MDBCol className='text-center'>
                         <MDBTypography tag='h1'>{event.name}</MDBTypography>
                         <MDBBadge pill color='success' light>
                           {event.category}
                        </MDBBadge>
                        <MDBBadge pill className='mx-2' color='danger' light>
                           {event.point} Reward points
                        </MDBBadge>
                        <MDBBadge pill color='warning' light>
                            Price: {event.price > 0 ? event.price + 'dollars ticket' : 'Free' }
                        </MDBBadge>
                        <p className='mt-5'> {event.description}
                        </p>
                        
                    </MDBCol>
                   
                    
                </div>
                
                </MDBContainer>
                <MDBContainer breakpoint="sm mt-5">
                       <img src={`${process.env.PUBLIC_URL}/assets/event/when.png`}  className='img-fluid shadow-4' alt='...' />
                    </MDBContainer>

                <div className='bg-success' >

                <MDBCard alignment='center'>
                        <MDBCardHeader className="p-3  bg-primary bg-gradient text-white rounded-5">10 seats remines</MDBCardHeader>
                        <MDBCardBody className='bg-primary shadow-1-strong text-white'>
                            <MDBCardTitle tag='h3'>Join the event now</MDBCardTitle>                      
                                <div>
                                    {isJoinedBefore ? <p className={"text-muted float-right"}>You have joined this event</p>
                                        :
                                        <button className={"btn btn-primary "}
                                                onClick={(e) => this.joinEvent(e)}>Join the event
                                        </button>
                                    }
                                    {isParticipationRequest ? <CustomizedSnackbar  vertical = {"bottom"}
                                                                                horizontal = {"right"}
                                                                                open = {isParticipationRequest}
                                                                                handleClose = {this.closeMessageBox}
                                                                                message={message} messageType={messageType}/> : null }

                                    {this.state.isOpenedQrCode ?
                                    <QrCode
                                        participantUsername = {participantUsername}
                                        event = {event}
                                        handleClose = {this.closeQrCode}/> : null }

                                </div>
                        </MDBCardBody>
                        <MDBCardFooter className='p-3 mb-2 bg-primary bg-gradient text-white rounded-5-muted'>10 days left</MDBCardFooter>
                        </MDBCard>

                </div>
                     
           </>
        );
    }
}

export default Event;