import React, {Component} from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import {Redirect, withRouter} from "react-router-dom";
import EventTable from "./EventTable"
import InfoIcon from '@material-ui/icons/Info';
import Consumer from '../ContextAPI/Context'
import EventsOfLecturer from "../Lecturer/EventsOfLecturer";
import {isLecturer, isOrganizator, isParticipant} from "../../Authentication";

import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBBadge,
    MDBCardLink,
  } from 'mdb-react-ui-kit';
class Events extends Component {

    render() {
        return(<Consumer>
                {
                    value => {
                        const {events} = value;
                        return (
                            <div className={"mt-5"}>
                                  <h5>All Events</h5>
                                {/* {<EventTable events = {events} />} */}

                                <MDBContainer breakpoint="sm mt-5">
                                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>

                                    {events.map(d => 
                                        (
                                        // <li key={d.firstName}>{d.lastName}</li>
                                        
                                        <MDBCol xl={4} lg={6} className='mb-4'  key={d.name}>
                                            <MDBCardLink href={'/event/' + d.name}>
                                             <MDBCard className='h-100'>
                                                <MDBCardImage
                                                    src='https://mdbootstrap.com/img/new/standard/city/044.webp'
                                                    alt='...'
                                                    position='top'
                                                />
                                                <MDBCardBody>
                                                    <MDBCardTitle>{d.name}</MDBCardTitle>
                                                    <MDBCardText>
                                                    
                                                     {d.description}
                                                    </MDBCardText>
                                                    <div className='ms-3 ml-1'>
                                                            <p className='fw-bold mb-1'> Location: {d.address}</p>
                                                        </div>
                                                        <div className='ms-3'>
                                                                <p className='fw-bold mb-1'>Reward Point: 
                                                                        <MDBBadge pill light className= 'ml-4 ms-2' color='success'>
                                                                            {d.point}
                                                                        </MDBBadge></p>
                                                                <p className='fw-bold mb-1'>Date:{d.startDate}</p>
                                                        </div>
                                                </MDBCardBody>
                                                <MDBCardFooter>
                                                    <small className='text-muted'>Last updated 3 mins ago</small>
                                                </MDBCardFooter>
                                                </MDBCard>
                                            </MDBCardLink>
                                        </MDBCol> 
                                        
                                        ))} 
                                        
                               </MDBRow>

                            </MDBContainer>
                                {isParticipant() ?
                                      <div className={"mt-5"}>
                                          <Alert severity="info" className={"container"}>
                                                <AlertTitle>Information</AlertTitle>
                                                to the left of the event name. <InfoIcon></InfoIcon>
                                                <strong>by pressing the icon
                                                    get information about the event and
                                                    you can attend the event.</strong>
                                        </Alert>
                                      </div> : null }
                                {isOrganizator() ?
                                    <div className={"mt-5"}>
                                        <Alert severity="info" className={"container"}>
                                            <AlertTitle>Information</AlertTitle>
                                            to the left of the event name. <InfoIcon></InfoIcon>
                                            <strong>by pressing the icon
                                                get information about the event,
                                                You can create a poll and view the participants of the event.
                                                you can view.</strong>
                                        </Alert>
                                    </div>
                                    : null}
                            </div>
                        );
                    }
                }
            </Consumer>
        )

    }
}

export default withRouter(Events);

