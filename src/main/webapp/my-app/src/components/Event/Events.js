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
                                  
                                {/* {<EventTable events = {events} />} */}
                                





                                <MDBContainer breakpoint="sm mt-5 ">
                                    <div className='text-center purple-700' >
                                      <h3 className='text-white'>Popular Events</h3>
                                    </div>
                                
                                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>

                                    {events.map(d => 
                                        (
                                        // <li key={d.firstName}>{d.lastName}</li>
                                        
                                        <MDBCol xl={4} lg={6} className='mb-4'  key={d.name}>
                                            <MDBCardLink href={'/event/' + d.name}>
                                             <MDBCard className='h-100 w-100'>
                                                <MDBCardImage
                                                            src={`${process.env.PUBLIC_URL}/assets/event/${d.imageUrl}`} 
                                                    alt='...'
                                                    position='top'
                                                />
                                                <MDBCardBody>
                                                    <MDBCardTitle>{d.name}</MDBCardTitle>
                                                    <MDBCardText>
                                                    
                                                     {d.description}
                                                    </MDBCardText>
                                                    <div className='ms-3'>
                                                            <p className='fw-bold mb-1'>Location: {d.location}</p>
                                                        </div>
                                                        <div className='ms-3'>
                                                                <p className='fw-bold mb-1'>Reward Point: 
                                                                        <MDBBadge pill light className= 'ml-4 ms-2' color='success'>
                                                                            {d.point}
                                                                        </MDBBadge></p>
                                                                <p className='fw-bold mb-1'>Date:{d.startDate}</p>
                                                                <p className='fw-bold mb-1'>Time:{d.startTime}</p>
                                                        </div>
                                                </MDBCardBody>
                                                <MDBCardFooter className='text-muted text-center'>
                                                    <small className='text-muted text-center'>{d.category}</small>
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
                                                <AlertTitle>Note:</AlertTitle>
                                                 Click the event to see more information.
                                        </Alert>
                                      </div> : null }
                                {isOrganizator() ?
                                    <div className={"mt-5"}>
                                        <Alert severity="info" className={"container"}>
                                            <AlertTitle>Note:</AlertTitle>
                                            Click the event to see more information.
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

