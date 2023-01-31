import React, {Component, useState} from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import {Redirect, withRouter} from "react-router-dom";
import {Card, Form, Button, Col, InputGroup} from 'react-bootstrap';
import EventTable from "./EventTable"
import InfoIcon from '@material-ui/icons/Info';
import Consumer from '../ContextAPI/Context'
import EventsOfLecturer from "../Lecturer/EventsOfLecturer";
import {isLecturer, isOrganizator, isParticipant} from "../../Authentication";
import Collapse from 'react-bootstrap/Collapse';

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

    state = {
        show: false,
        name: '',
        startDate: '',
        events: [],
        eventType: 0,
      }



      toggle = () => this.setState((currentState) => ({show: !currentState.show}));

      handleEventTypeChange = (e) => {
        this.setState({
            eventType : e.target.value,
            // events : events.filter(e => e.eventType === this.state.eventType),
        })
    }
      changeInput = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    

    render() {

        return(<Consumer>
                {
                    value => {
                        var {events} = value;
                     
                         events = this.state.eventType === 0 ? events : events.filter(e => e.eventType === this.state.eventType)
                   
                        return (
                            <div className={"mt-1 mr-5 text-white text-right"}>
                                  
                                  <div>
                                    <a  aria-controls="example-collapse-text"
                                          aria-expanded={this.state.show} className='text-white' href="#" role="button" onClick={this.toggle}>
                                     Advanced Search
                                    </a>    
                                   
                                    <Collapse in={this.state.show}>
                                          <div id="example-collapse-text">
                                    <Form >
                                        <Card.Body>
                                            <Form.Row className={"mt-1 mr-5 text-white text-left"}>
                                                <Form.Group as={Col} controlId="formGridName">
                                                    <Form.Label>Search</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="text" name="name"
                                                                      value={this.state.name} onChange={(e) => this.changeInput(e)}
                                                                      placeholder="Event Name" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridType">
                                                    <Form.Label>Event Category</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control as="select" required
                                                            value={this.state.eventType}
                                                            onChange={(e) => this.handleEventTypeChange(e)}>
                                                            <option value="0"> Select All </option>
                                                            <option value="1">Sporting</option>
                                                            <option value="2">Art & Music</option>
                                                            <option value="3">Conference & Seminars</option>
                                                            <option value="4">Team Spirit</option>
                                                            <option value="5">Food & Drink</option>
                                                        </Form.Control>
                                                    </InputGroup>
                                                    
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridStartDate">
                                                    <Form.Label>Start date</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="date" name="startDate"
                                                                      value={this.state.startDate} onChange={(e) => this.changeInput(e)}
                                                                    //   className={" text-white"}
                                                                      placeholder="Starting date" />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>
                                            </Card.Body>
                                            <Card.Footer style={{"textAlign":"right"}}
                                                     className={"d-flex justify-content-between"}>
                                            <div >
                                            
                                            </div>
                                            <Button  variant="success" type="submit">
                                            submit
                                            </Button>
                                        </Card.Footer>
                                    </Form>
                                    </div>
                                    </Collapse>
                                 
                                </div>
                                                            

                                <MDBContainer breakpoint="sm mt-5 text-left ">
                                    <div className='text-center' >
                                      <h1 className='text-white'>Popular Events</h1>
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
                                                <MDBCardBody  >
                                                    <MDBCardTitle>{d.name}</MDBCardTitle>
                                                    <MDBCardText>
                                                    
                                                     {d.description}
                                                    </MDBCardText>

                                                    <div className='ms-3 d-flex '>
                                                            <p className='fw-bold mb-1'>Location: {d.location}</p>
                                                        </div>
                                                        <div className='ms-3 align-items-baseline'>
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

