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

    constructor(props) {
        super(props);
        this.state = {
            linkContent : 'Details',
            event : [],
        }
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

    render() {

        const {linkContent,event} = this.state;
        return (

            <>
            <MDBCard background='dark' className='text-white'>
                <MDBCardImage overlay  src={`${process.env.PUBLIC_URL}/assets/event/baseball.jpeg`}  alt='...' />
                <MDBCardOverlay >
                    <MDBCardTitle className='display-3 text-center mt-50'>{event.name}</MDBCardTitle>
                    <MDBCardText className='text-center'>
                    This is a wider card with supporting text below as a natural lead-in to additional content. This
                    content is a little bit longer.
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
                           Sports Event 
                        </MDBBadge>
                        <MDBBadge pill className='mx-2' color='danger' light>
                           250 Reward points
                        </MDBBadge>
                        <MDBBadge pill color='warning' light>
                            $5 dollars ticket
                        </MDBBadge>
                        <p className='mt-5'> What a wonderful event that you cannot miss this opportunity to see how the team perform. Buy the 
                            ticket now!!
                        </p>
                        
                    </MDBCol>
                   
                    
                </div>
                
                </MDBContainer>
                <MDBContainer breakpoint="sm mt-5">
                       <img src={`${process.env.PUBLIC_URL}/assets/event/when.png`}  className='img-fluid shadow-4' alt='...' />
                    </MDBContainer>

                <div className='bg-success' >

                <MDBCard alignment='center'>
                        <MDBCardHeader className="p-3 mb-2 bg-success bg-gradient text-white rounded-5">Featured</MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardTitle tag='h3'>Join the event now</MDBCardTitle>
                            
                            <MDBBtn href='#'>Join the event</MDBBtn>
                        </MDBCardBody>
                        <MDBCardFooter className='p-3 mb-2 bg-success bg-gradient text-white rounded-5-muted'>10 days left</MDBCardFooter>
                        </MDBCard>

                </div>
                     
           </>
        );
    }
}

export default Event;