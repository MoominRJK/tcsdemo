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
        startTime : '',
        endTime : '',
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
        eventType : '' ,
        location: '',
        price: 0, 
        imageUrl: '',
        description: '',
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
            this.showErrorMessageAboutEventAs('This event has concluded and cannot be updated. !');
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
    const { name, endDate,startDate,endTime,startTime,quota,address,longitude,latitude,currentNumberOfPeople, city,
        state,
        zip,
        point,
        eventType,location,
        price, 
        imageUrl,
        description } = event;
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
            eventType,
            location,
            price, 
            imageUrl,
            description,
        });
    }

    updateEvent = async (e,dispatch) =>{
        e.preventDefault();
        const { name, endDate,startDate,quota,address,longitude,latitude,currentNumberOfPeople, city, state, zip, point, eventType,location,
            price, 
            imageUrl,
            description} = this.state;

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
            eventType,
            location,
            price, 
            imageUrl,
            description,
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
                                            <Form.Label>Event Category</Form.Label>
                                            <Form.Control type="text" placeholder="Event Category"
                                                          required
                                                          id = "eventCategory"
                                                        // min ={currentNumberOfPeople}
                                                          value = {this.state.eventCategory}
                                                          name = "eventCategory"
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
                                        <Form.Group >
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control type="time" placeholder="Start Time"
                                                          required
                                                          id = "startTime"
                                                          value = {this.state.startTime}
                                                          name = "startTime"
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
                                            <Form.Label>End Time</Form.Label>
                                            <Form.Control type="time" placeholder="End Time"
                                                          required
                                                          id = "endTime"
                                                          min = {this.state.startTime}
                                                          value = {this.state.endTime}
                                                          name = "endTime"
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

                                        <Form.Group >
                                            <Form.Label>Location/Room</Form.Label>
                                            <Form.Control type="location" placeholder="location"
                                                          required
                                                          id = "location"
                                                          value = {this.state.location}
                                                          name = "location"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="price" placeholder="price"
                                                          required
                                                          id = "price"
                                                          value = {this.state.price}
                                                          name = "price"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="description" placeholder="description"
                                                          required
                                                          id = "description"
                                                          value = {this.state.description}
                                                          name = "latitdescriptionude"
                                                          onChange={this.updateInput}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Event Image</Form.Label>
                                            <Form.Control type="imageUrl" placeholder="imageUrl"
                                                          required
                                                          id = "imageUrl"
                                                          value = {this.state.imageUrl}
                                                          name = "imageUrl"
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
                                        horizontal = {"center"}/> : null}
                            </Modal>

                        );
                    }
                }
            </Consumer>
            )

    }
}

export default withRouter(UpdateEventForm);