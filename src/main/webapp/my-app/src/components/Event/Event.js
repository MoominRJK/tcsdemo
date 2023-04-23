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
    MDBRow,
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
        // if(isParticipant()) {
        //     // this.isJoinedBeforeAsParticipantToEvent()
        //     //     .then(isJoinedBefore => {
        //     //         this.setState({
        //     //             isJoinedBefore : isJoinedBefore
        //     //         })
        //     //     })
        // }
        // else {
        //     this.props.history.push('/notFound404');
        // }

    }

    isJoinedBeforeAsParticipantToEvent = async () => {

        var participantUsername = localStorage.getItem("username");
        const response = await axios.post(`/isJoinedBefore/${participantUsername}`,
            this.props.event, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
                console.log();
            this.props.history.push("/notFound404");
        })
        return response.data;
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
    isEventAlreadyStarted = (startDate) =>{
        var eventStartDate = new Date(startDate);
        var currentDate = new Date();
        return currentDate > eventStartDate;
    }

    daysLeft = (startDate) =>{
        var eventStartDate = new Date(startDate);
        var currentDate = new Date();
        const diffTime = Math.abs(eventStartDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        return diffDays;
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

                    <MDBCol className='text-center text-white mt-5 mb-5'>
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
                       {/* <img src={`${process.env.PUBLIC_URL}/assets/event/when1.png`}  className='img-fluid shadow-4 ml-5' alt='...' /> */}
                   <MDBRow className='row-cols-1 row-cols-md-2 g-4 mb-5'>
                     
                     <MDBCol >
                       <MDBCard id="grad1" style={{ maxWidth: '540px' }}>
                            <MDBRow className='g-0 '>
                                <MDBCol md='4'>
                                <MDBCardImage src={`${process.env.PUBLIC_URL}/assets/event/w.png`}  alt='...' fluid />
                                <MDBCardTitle className='ml-5 display-5 '>WHERE</MDBCardTitle>
                                </MDBCol>
                                <MDBCol md='8'>
                                <MDBCardBody className='mt-3'>
                                    <MDBCardTitle> {event.location}</MDBCardTitle>
                                    <MDBCardText>
                                    </MDBCardText>
                                    <MDBCardText>
                                       {event.address}
                                    </MDBCardText>
                                    <MDBCardText>
                                       {event.city}  {event.state}  {event.zip}
                                    </MDBCardText>
                                </MDBCardBody>
                                </MDBCol>              
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>

               
                    <MDBCol >
                       <MDBCard id="grad1" style={{ maxWidth: '540px' }}>
                            <MDBRow className='g-0'>
                                <MDBCol md='4'>
                                <MDBCardImage src={`${process.env.PUBLIC_URL}/assets/event/n.png`}  alt='...' fluid />
                                <MDBCardTitle className='ml-5 display-5 '>WHEN</MDBCardTitle>
                                </MDBCol>
                                <MDBCol md='8'>
                                <MDBCardBody>
                                    
                                    <MDBCardText>
                                    
                                    </MDBCardText>
                                    <MDBCardText>
                                       {event.startDate} {event.startTime} 
                                    </MDBCardText>
                                    <MDBCardText>
                                       To
                                    </MDBCardText>
                                    <MDBCardText>
                                       {event.endDate} {event.endTime} 
                                    </MDBCardText>
                                </MDBCardBody>
                                </MDBCol>

                                
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
      
                  </MDBRow>

                </MDBContainer>

                <div className='bg-primary' >

                <MDBCard alignment='center' className='bg-primary'>
                        
                       
                        { (this.isEventAlreadyStarted(event.startDate)) ? 
                            <div>
                            <MDBCardHeader className="p-3  bg-primary bg-gradient text-white rounded-5">{event.currentNumberOfPeople} students participated</MDBCardHeader>
                                <MDBCardBody className='bg-primary shadow-1-strong text-white'>



                                <MDBCardTitle tag='h3'>This event has concluded.</MDBCardTitle>                      
                                   
                                </MDBCardBody>


                                <MDBCardFooter className='p-3 mb-5  bg-primary bg-gradient text-white rounded-5-muted'>Upload the event pictures of yours.</MDBCardFooter>
                                 <MDBContainer className='bg-white'>
                                {/* <MDBCardTitle className='display-4 bg-white text-center text-primary mt-50'>Event Gallery</MDBCardTitle> */}
                                <MDBTypography tag='h1' >Event Gallery</MDBTypography>
                                    <MDBRow className='bg-white '>
                                    <MDBCol lg={4} md={12} className='mb-4 bg-white mb-lg-0'>
                                        <img
                                        src={`${process.env.PUBLIC_URL}/assets/event/eg1.jpeg`} 
                                        className='w-100 shadow-1-strong rounded mb-4'
                                        alt='Boat on Calm Water'
                                        />

                                    </MDBCol>

                                    <MDBCol lg={4} className='mb-4 bg-white mb-lg-0'>
                              

                                        <img
                                        src={`${process.env.PUBLIC_URL}/assets/event/eg2.jpeg`} 
                                        className='w-100 shadow-1-strong rounded mb-4'
                                        alt='Boat on Calm Water'
                                        />
                                    </MDBCol>

                                    <MDBCol lg={4} className='mb-4 mb-lg-0'>
                                        <img
                                        src={`${process.env.PUBLIC_URL}/assets/event/eg3.jpeg`} 
                                        className='w-100 shadow-1-strong rounded mb-4'
                                        alt='Waves at Sea'
                                        />

                            
                                    </MDBCol>
                                    </MDBRow>

                                    </MDBContainer>


                            </div>          
                        :
                         <div>
                           <MDBCardHeader className="p-3  bg-primary bg-gradient text-white rounded-5">{event.quota - event.currentNumberOfPeople} seats remain</MDBCardHeader>
                               <MDBCardBody className='bg-primary shadow-1-strong text-white'>



                                <MDBCardTitle tag='h3'>Join the event now</MDBCardTitle>                      
                                    <div>
                                        {isJoinedBefore ? <p className={"text-muted float-right"}>You have joined the event.</p>
                                            :
                                            <button className={"btn btn-primary "}
                                                    onClick={(e) => this.joinEvent(e)}>Join the event
                                            </button>
                                        }
                                
                                        {isParticipationRequest ? <CustomizedSnackbar  vertical = {"bottom"}
                                                                                    horizontal = {"center"}
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
                                <MDBCardFooter className='p-3 mb-2 bg-primary bg-gradient text-white rounded-5-muted'>{this.daysLeft(event.startDate)} days left</MDBCardFooter>
                               
                            </div>
                        }
                     

                        
                        {/* { (this.isEventAlreadyStarted(event.startDate)) ? <p> This event has concluded.</p> :
                        <MDBCardFooter className='p-3 mb-2 bg-primary bg-gradient text-white rounded-5-muted'>{this.daysLeft(event.startDate)} days left</MDBCardFooter>
                          } */}
                        </MDBCard>

                </div>
                     
           </>
        );
    }
}

export default Event;