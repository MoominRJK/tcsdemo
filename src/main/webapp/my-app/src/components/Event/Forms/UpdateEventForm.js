import React, {Component} from 'react';
import {isOrganizator} from "../../../Authentication";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Consumer from '../../ContextAPI/Context'
import {withRouter} from "react-router-dom";
import PositionedSnackbar from "../../static/Snackbars/PositionedSnackbar";
class UpdateEventForm extends Component {

    state = {
        isModalOpen : this.props.open,
        name : '',
        startDate : '',
        endDate : '',
        address : '',
        quota : 0,
        currentNumberOfPeople : 0,
        longitude : 0,
        latitude : 0,
        isSubmittedForm: false,
        isEventStarted : false,
        message : '',
        messageType : '',
        isDisable : false,
        city : '',
        state : '',
        zip : '',
        point : 0,
        eventType : 1 
    }
    componentDidMount = async () => {
        if(!isOrganizator()) {
            this.props.history.push('/notFound404');
        }
        const response = await axios.get(`/events/${this.props.eventName}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });

        if(this.isEventStarted(response.data.startDate)) {
            this.showErrorMessageAboutEventAs('This event cannot be updated because its start date has passed. !');
        }
        else {
           this.getValuesOfEvent(response.data);
        }
    }

    isEventStarted = (startDate) => {
        var eventStartDate = new Date(startDate);
        var currentDate = new Date();
        return currentDate > eventStartDate;

    }

    showErrorMessageAboutEventAs = (errorMessage) =>{
        this.setState({
            isEventStarted : true,
            message : errorMessage,
            messageType : 'ERROR',
            isDisable : true,
        })
    }

    getValuesOfEvent = (event) =>{
    const { name, endDate,startDate,quota,address,longitude,latitude,currentNumberOfPeople, city,
        state,
        zip,
        point,
        eventType } = event;
        this.setState({
            name,
            endDate,
            startDate,
            currentNumberOfPeople,
            quota,
            address,
            longitude,
            latitude,
            city,
            state,
            zip,
            point,
            eventType
        });
    }

    updateEvent = async (e,dispatch) =>{
        e.preventDefault();
        const { name, endDate,startDate,quota,address,longitude,latitude,currentNumberOfPeople, city, state, zip, point, eventType} = this.state;

        const updatedEvent = {
            name : name.trim(),
            endDate,
            startDate,
            quota,
            address,
            longitude,
            latitude,
            city,
            state,
            zip,
            point,
            eventType
        }
        const response = await axios.put(`/events/${this.props.eventName}`, updatedEvent,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
            }).catch(err => {
                this.props.history.push('/notFound404');
        });

        this.showUpdateOperationMessage(response.data);
        if(this.isUpdateSuccess(response.data.messageType)){
            dispatch({ type: 'updateEvent', payload:[this.props.eventName,updatedEvent]});
            this.preventToSubmitFormMultipleTimes();
        }
    }

    showUpdateOperationMessage = (messageResponse) =>{
        this.setState({
            isSubmittedForm : true,
            message : messageResponse.message,
            messageType : messageResponse.messageType
        })
    }
    isUpdateSuccess = (messageType) =>{
        return messageType === 'SUCCESS'
    }

    preventToSubmitFormMultipleTimes = () =>{
        this.setState({isDisable : true})
    }


    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setStateOfMessageForReRenderingToSnackbar = () =>{
        this.setState({
           isSubmittedForm : false
        })
    }


    render() {
        const {isModalOpen,message,messageType,
            isSubmittedForm,isEventStarted, currentNumberOfPeople} = this.state;
        return(
            <Consumer>
                {
                    value =>{
                        const{dispatch} = value;
                        return(
                            <Modal
                                size="lg"
                                show={isModalOpen}
                                onHide={() => this.props.handleClose()}
                                aria-labelledby="example-modal-sizes-title-lg"
                                keyboard = {false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                         Update Event
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit ={(e) => this.updateEvent(e,dispatch)}>
                                        <Form.Group >
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text"
                                                          placeholder="Name"
                                                          required
                                                          id = "name"
                                                          name="name"
                                                          value = {this.state.name}
                                                          onChange={this.updateInput}
                                            />
                                        </Form.Group>

                                      
                                        <Form.Group>
                                            <Form.Label>Event Type</Form.Label>
                                            <Form.Control type="number" placeholder="Event Type"
                                                          required
                                                          id = "eventType"
                                                          min ={currentNumberOfPeople}
                                                          value = {this.state.eventType}
                                                          name = "eventType"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control type="date" placeholder="Start Date"
                                                          required
                                                          id = "startDate"
                                                          value = {this.state.startDate}
                                                          name = "startDate"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control type="date" placeholder="End Date"
                                                          required
                                                          id = "endDate"
                                                          min = {this.state.startDate}
                                                          value = {this.state.endDate}
                                                          name = "endDate"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Award Point</Form.Label>
                                            <Form.Control type="number" placeholder="Award Point"
                                                          required
                                                          id = "point"
                                                          min ={currentNumberOfPeople}
                                                          value = {this.state.point}
                                                          name = "point"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>


                                        <Form.Group>
                                            <Form.Label>Quota</Form.Label>
                                            <Form.Control type="number" placeholder="Quota"
                                                          required
                                                          id = "quota"
                                                          min ={currentNumberOfPeople}
                                                          value = {this.state.quota}
                                                          name = "quota"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>
                                            {/* <Form.Group>
                                                <Form.Label>Number of people registered for the event</Form.Label>
                                                <Form.Control type="number" placeholder="Number of registered people"
                                                              disabled
                                                              id = "currentNumberOfPeople"
                                                              value = {currentNumberOfPeople}
                                                              name = "currentNumberOfPeople"
                                                              />
                                            </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Latitude</Form.Label>
                                            <Form.Control type="number" placeholder="Latitude"
                                                          required
                                                          id = "latitude"
                                                          value = {this.state.latitude}
                                                          name = "latitude"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label>Longitude</Form.Label>
                                            <Form.Control type="number" placeholder="Longitude"
                                                          required
                                                          id = "longitude"
                                                          value = {this.state.longitude}
                                                          name = "longitude"
                                                          onChange={this.updateInput}/>
                                        </Form.Group> */}
                                        <Form.Group >
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="address" placeholder="Address"
                                                          required
                                                          id = "address"
                                                          value = {this.state.address}
                                                          name = "address"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="city" placeholder="City"
                                                          required
                                                          id = "city"
                                                          value = {this.state.city}
                                                          name = "city"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>State</Form.Label>
                                            <Form.Control type="state" placeholder="State"
                                                          required
                                                          id = "state"
                                                          value = {this.state.state}
                                                          name = "state"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control type="zip" placeholder="Zip"
                                                          required
                                                          id = "zip"
                                                          value = {this.state.address}
                                                          name = "zip"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>

                                        <Button variant="primary" type="submit"
                                                disabled = {this.state.isDisable}
                                        onClick = {this.setStateOfMessageForReRenderingToSnackbar}>
                                            Submit
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                {isSubmittedForm  || isEventStarted ?
                                    <PositionedSnackbar
                                        message = {message}
                                        messageType = {messageType}
                                        vertical = {"bottom"}
                                        horizontal = {"right"}/> : null}
                            </Modal>

                        );
                    }
                }
            </Consumer>
            )

    }
}

export default withRouter(UpdateEventForm);