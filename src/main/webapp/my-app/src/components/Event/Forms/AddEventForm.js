import React, {Component} from 'react';
import {Card, Form, Button, Col, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import PositionedSnackbar from "../../static/Snackbars/PositionedSnackbar";
import Consumer from "../../ContextAPI/Context"
import LecturerSelection from "../../Lecturer/LecturerSelection";
import DesicionDialogForAddingQuestionsToEvent from "../DesicionDialogForAddingQuestionsToEvent";
import Events from '../../../components/Event/Events'

class AddEventForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        name : '',
        startDate : '',
        endDate : '',
        startTime: '',
        endTime: '',
        address : '',
        quota : 0,
        longitude : 0,
        lecturerUsername : '',
        latitude : 0,
        currentNumberOfPeople : 0,
        raffleWinnerUsername : '',
        isSubmittedForm: false,
        message : '',
        messageType : '',
        isAdded : false,
        city : '',
        state : '',
        zip : '',
        point : 0,
        eventType : 0,
        location: '',
        price: 0, 
        imageUrl: '',
        description: ''
    }

    resetAllInputs = () =>{
        this.setState(() => this.initialState);
    }

    addEvent = async (e,dispatch) =>{
        const {name,startDate,endDate, startTime,
            endTime,quota,
            longitude,latitude,address,lecturerUsername,
            currentNumberOfPeople,raffleWinnerUsername, city, state, zip, point, eventType, location, price, imageUrl,description} = this.state;

         e.preventDefault();
        var event  = {
            name : name.trim(),
            startDate,
            endDate,
            startTime,
            endTime,
            quota,
            longitude,
            latitude,
            address,
            lecturerUsername,
            currentNumberOfPeople,
            raffleWinnerUsername,
            city,
            state,
            zip,
            point,
            eventType,
            location, 
            price,
            imageUrl,
            description
        }
        var organizatorUsername = localStorage.getItem("username");
        const response = await axios.post(`/events/${organizatorUsername}/${this.state.lecturerUsername}`,
            event, {
            headers : {
                'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
            }
        }).catch(err => {
            this.props.history.push("/notFound404");
        })

        this.showMessage(response.data);
        if(this.isAdditionSuccess(response.data.messageType)) {
            dispatch({ type: 'addEvent', payload: event })

        }
        setTimeout(() => {
            this.setState({
                isSubmittedForm : false,
            })
        }, 2000);

    }

    showMessage = (messageResponse) =>{
        this.setState({
            isSubmittedForm : true,
            message : messageResponse.message,
            messageType :messageResponse.messageType
        })
    }

    isAdditionSuccess = (messageType) => {
        return messageType === 'SUCCESS'
    }

    handleEventTypeChange = (e) => {
        this.setState({
            eventType : e.target.value
        })
    }

    changeInput = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    changeLecturerUsernameWith = (val) =>{
        this.setState({
            lecturerUsername : val
        })
    }

    render() {
        const {name,startDate,endDate, startTime,
            endTime,quota,longitude,address,
               latitude,isSubmittedForm,
                message,messageType, city, state, zip, point, eventType, location, price, imageUrl, description} = this.state;

        return (
            <Consumer>
                {
                    value =>{
                        const {dispatch} = value;
                        return(
                            <div>
                                <Card className={"container w-50 mt-5"}>
                                    <Card.Header className="bg-primary text-white">
                                       Add Event
                                    </Card.Header>
                                    <Form onReset={this.resetAllInputs} onSubmit={(e) => this.addEvent(e,dispatch)} >
                                        <Card.Body>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridName">
                                                    <Form.Label>Name</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="text" name="name"
                                                                      value={name} onChange={(e) => this.changeInput(e)}
                                                                    //   className={"text-white"}
                                                                      placeholder="Name" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridType">
                                                    <Form.Label>Event Category</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control as="select" required
                                                            value={this.state.eventType}
                                                            onChange={(e) => this.handleEventTypeChange(e)}>
                                                            <option value=""> Select </option>
                                                            <option value="1">Sporting</option>
                                                            <option value="2">Art & Music</option>
                                                            <option value="3">Conference & Seminars</option>
                                                            <option value="4">Team Spirit</option>
                                                            <option value="5">Food & Drink</option>
                                                        </Form.Control>
                                                    </InputGroup>
                                                    
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Row>
                                                 <Form.Group as={Col} controlId="formGridStartDate">
                                                    <Form.Label>Start date</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="date" name="startDate"
                                                                      value={startDate} onChange={(e) => this.changeInput(e)}
                                                                    //   className={" text-white"}
                                                                      placeholder="Starting date" />
                                                    </InputGroup>
                                                </Form.Group>
                                                
                                                <Form.Group as={Col} controlId="formGridEndDate">
                                                    <Form.Label>End Date</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="date" name="endDate"
                                                                      min = {startDate}
                                                                      value={endDate} onChange={this.changeInput}
                                                                    //   className={" text-white"}
                                                                      placeholder="end date" />
                                                    </InputGroup>
                                                </Form.Group>

                                            </Form.Row>


                                            <Form.Row>
                                                 <Form.Group as={Col} controlId="formGridStartTime">
                                                    <Form.Label>Start time</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="time" name="startTime"
                                                                      value={startTime} onChange={(e) => this.changeInput(e)}
                                                                    //   className={" text-white"}
                                                                      placeholder="Starting time" />
                                                    </InputGroup>
                                                </Form.Group>
                                                
                                                <Form.Group as={Col} controlId="formGridEndTime">
                                                    <Form.Label>End time</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="time" name="endTime"
                                                                      min = {startTime}
                                                                      value={endTime} onChange={this.changeInput}
                                                                    //   className={" text-white"}
                                                                      placeholder="end time" />
                                                    </InputGroup>
                                                </Form.Group>

                                            </Form.Row>

                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridQuota">
                                                    <Form.Label>Award Point</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="number" name="point"
                                                                      min = "1"
                                                                      value={point} onChange={this.changeInput}
                                                                    //   className={" text-white"}
                                                                      placeholder="Award Point" />
                                                    </InputGroup>
                                                </Form.Group>
                                                
                                                <Form.Group as={Col} controlId="formGridQuota">
                                                    <Form.Label>Event Quota</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="number" name="quota"
                                                                      min = "1"
                                                                      value={quota} onChange={this.changeInput}
                                                                    //   className={" text-white"}
                                                                      placeholder="Event Quota" />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>


                                            <Form.Row>
                                                {/* <Form.Group as={Col} controlId="formGridLongitude">
                                                    <Form.Label>Longitude</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="number" name="longitude"
                                                                      value={longitude} onChange={this.changeInput}
                                                                      className={"bg-dark text-white"}
                                                                      placeholder="Longitude" />
                                                    </InputGroup>
                                                </Form.Group> */}
                                                 <Form.Group as={Col} controlId="formGridAddress">
                                                    <Form.Label>Address</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="text" name="address"
                                                                      value={address} onChange={(e) => this.changeInput(e)}
                                                                    //   className={"bg-dark text-white"}
                                                                      placeholder="Address" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridCity">
                                                    <Form.Label>City</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="text" name="city"
                                                                      value={city} onChange={(e) => this.changeInput(e)}
                                                                    //   className={"bg-dark text-white"}
                                                                      placeholder="City" />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Row>
                                                 <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Label>State</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="text" name="state"
                                                                      value={state} onChange={(e) => this.changeInput(e)}
                                                                    //   className={"bg-dark text-white"}
                                                                      placeholder="State" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridZip">
                                                    <Form.Label>Zip</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="zip" name="zip"
                                                                      value={zip} onChange={(e) => this.changeInput(e)}
                                                                    //   className={"bg-dark text-white"}
                                                                      placeholder="Zip" />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridLocation">
                                                    <Form.Label>Location/Room</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="text" name="location"
                                                                      value={name} onChange={(e) => this.changeInput(e)}
                                                                    //   className={"text-white"}
                                                                      placeholder="Location/Room" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridPrice">
                                                    <Form.Label>Price</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="number" name="price"
                                                                      min = "0"
                                                                      value={point} onChange={this.changeInput}
                                                                    //   className={" text-white"}
                                                                      placeholder="Price" />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridDescription">
                                                    <Form.Label>Description (Max 255 words)</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off" as="textarea" rows={5}
                                                                      type="textarea" name="description"
                                                                      value={description} onChange={(e) => this.changeInput(e)}
                                                                    //   className={"text-white"}
                                                                      placeholder="Description" />
                                                    </InputGroup>
                                                </Form.Group>
                                               
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridImage">
                                                    <Form.Label>Event Iamge </Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required autoComplete="off"
                                                                      type="file" name="iamgeUrl"
                                                                      value={imageUrl} onChange={(e) => this.changeInput(e)}
                                                                    //   className={"text-white"}
                                                                      placeholder="Description" />
                                                    </InputGroup>
                                                </Form.Group>
                                               
                                            </Form.Row>






                                            {/* <Form.Row>
                                                <Form.Group as={Col} controlId="formGridLatitude">
                                                    <Form.Label>Latitude</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control required
                                                                      type="number" name="latitude"
                                                                      value={latitude} onChange={this.changeInput}
                                                                      className={"bg-dark text-white"}
                                                                      placeholder="Latitude" />
                                                    </InputGroup>
                                                </Form.Group>
                                                <LecturerSelection
                                                    onSelectLecturer = {this.changeLecturerUsernameWith}></LecturerSelection>

                                            </Form.Row> */}
                                        </Card.Body>
                                        <Card.Footer style={{"textAlign":"right"}}
                                                     className={"d-flex justify-content-between"}>
                                            <Button variant="success" type="submit" disabled = {isSubmittedForm}>
                                            Create
                                            </Button>
                                            <Button  variant="info" type="reset">
                                            Reset
                                            </Button>
                                        </Card.Footer>
                                    </Form>
                                </Card>
                                {isSubmittedForm  ?
                                    <PositionedSnackbar
                                        message = {message}
                                        messageType = {messageType}
                                        vertical = {"bottom"}
                                        horizontal = {"right"}/>
                                        : null}
                                {/* {messageType === "SUCCESS" ? <DesicionDialogForAddingQuestionsToEvent
                                                                eventName = {name}/> : null} */}
                                {messageType === "SUCCESS" ? this.props.history.push('/events') : null}



                            </div>
                        );
                    }
                }
            </Consumer>

        );
    }
}

export default AddEventForm;