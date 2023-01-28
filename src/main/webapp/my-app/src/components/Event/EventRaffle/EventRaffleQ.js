import React, {Component} from 'react';
import EventSelectionForRaffle from "./EventSelectionForRaffle";
import axios from "axios";
import PositionedSnackbar from "../../static/Snackbars/PositionedSnackbar";
import SimpleBackdrop from "../../static/SimpleBackdrop";
import CustomizedSnackbar from "../../static/Snackbars/CustomizedSnackbar";
import RaffleInformation from "./RaffleInformation";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {getEventPoints} from "../../../HelperFunctions/EventHelpers";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import {
    MDBCard,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCardOverlay,
  } from 'mdb-react-ui-kit';

class EventRaffleQ extends Component {
    state = {
        selectedEvent : '',
        raffleWinnerUsername : '',
        events : [],
        participants : [],
        selectedEventName : '',
        isBackDropOpen : false,
        message  : '',
        messageType : '',
        isMessageBoxOpen: false,
        nonRaffledEvents : [],
        userType : '',
        userType1 : '',
        saveReocrd : false,
        pp: [],
        columns: [
            { title: 'First Name', field: 'firstName',
            headerStyle: {
              backgroundColor: '#039be5',
              color: '#FFF'
            } },
            { title: 'Last Name', field: 'lastName',
            headerStyle: {
              backgroundColor: '#039be5',
              color: '#FFF'
            } },
            { title: 'Grade', field: 'grade',
            headerStyle: {
              backgroundColor: '#039be5',
              color: '#FFF'
            }},
            {title : 'Total Points', field : 'totalPoint',
            headerStyle: {
              backgroundColor: '#039be5',
              color: '#FFF'
            }},
        ],
        doShow: false,
       
    }

    changeEventNameWith = (val) =>{
        this.setState({
            selectedEventName : val
        })
    }

    componentDidMount =  () => {
        this.getAllNonRaffledEvents();
    }

    getAllNonRaffledEvents = async () =>{
        await axios.get(`/events/NonRaffled`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            },
        }).then((response) =>{
            this.setState({
                nonRaffledEvents : response.data
            })
        })

    }

    createRaffle =  (e) =>{
        e.preventDefault();
        const {selectedEventName,nonRaffledEvents} = this.state;
        var index = this.findIndexOfEvent(selectedEventName);
        var selectedEvent = nonRaffledEvents[index];
        if(!this.isEventHasParticipant(selectedEvent)) {
            this.setMessageAs("This event has no participants.","ERROR");
        }
        else if(this.isEventHasAlreadyRaffleWinner(selectedEvent)) {
           this.setMessageAs("Draw was made before this event.","ERROR");
        }
        else{
            this.getParticipantsOfSelectedEventForRaffle(selectedEventName)
                .then(participants => this.chooseRaffleWinnerFrom(participants));
        }

    }

    sendQuestions = async (e) => {
       
        e.preventDefault();
            const {userType, userType1, saveReocrd} = this.state;
            const response = await axios.get(`/prize/${userType}/${userType1}/${saveReocrd}`, {
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('jwtToken')
                }
            }).catch(err => {
                this.props.history.push('/notFound404');
            });

            
            this.setState({
                pp : response.data,
                doShow : response.data.length > 0 ? true : false

            })

    }

    findIndexOfEvent = (selectedEventName) => {
        const {nonRaffledEvents} = this.state;
        return nonRaffledEvents.findIndex(event => event.name === selectedEventName);
    }

    isEventHasParticipant = (event) => {
        return event.currentNumberOfPeople > 0;
    }

    isEventHasAlreadyRaffleWinner = (event) =>{
        return event.raffleWinnerUsername != null &&
            event.raffleWinnerUsername.length > 0;

    }

    setMessageAs = (message,messageType) =>{
        this.setState({
            message : message,
            messageType : messageType,
            isMessageBoxOpen : true
        })
    }

    getParticipantsOfSelectedEventForRaffle = async (eventName) =>{
        const response = await axios.get(` /participants/${eventName}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            },
        })
        this.setState({
            participants : response.data
        })
        return response.data;
    }

    chooseRaffleWinnerFrom = (participants) => {
        let raffleWinnerParticipant;
        this.openBackdrop();
        this.setMessageAs("System is picking the winner!!!","SUCCESS");
        setTimeout(() =>{
            raffleWinnerParticipant = this.createRaffleWinnerFrom(participants);
            this.updateRaffleWinnerOfEventWith(raffleWinnerParticipant);
            this.closeBackdrop();
        },2000);
    }

    openBackdrop = () =>{
        this.setState({
            isOpenBackdrop : true
        })
    }

    createRaffleWinnerFrom = (participants) => {
        var randomValue = Math.floor(Math.random() * participants.length);
        return participants[randomValue];
    }

    updateRaffleWinnerOfEventWith = (raffleWinnerParticipant) => {
        const {nonRaffledEvents,selectedEventName} = this.state;
        var index = this.findIndexOfEvent(selectedEventName,nonRaffledEvents);
        nonRaffledEvents[index].raffleWinnerUsername = raffleWinnerParticipant.username;
        this.setState({
            nonRaffledEvents: nonRaffledEvents,
            selectedEvent : nonRaffledEvents[index],
            raffleWinnerUsername : raffleWinnerParticipant.username,
        })
    }

    closeBackdrop = () =>{
        this.setState({
            isOpenBackdrop : false
        })
    }

    closeMessageBox = () =>{
        this.setState({
            isMessageBoxOpen : false,
        })
    }

    isRaffleEnded = () => {
        const {raffleWinnerUsername} = this.state;
        return raffleWinnerUsername.length > 0;
    }

    handleUserTypeChange = (e) => {
        this.setState({
            userType : e.target.value
        })
    }

    handleUserType1Change = (e) => {
        this.setState({
            userType1 : e.target.value
        })
    }

    handleCheckboxChange = (e) =>{
        this.setState({saveReocrd: e.target.value});
    }


    render() {
            const {isOpenBackdrop,isMessageBoxOpen,messageType,selectedEvent,
                selectedEventName,raffleWinnerUsername,message} = this.state;
        return (
            <>
            <MDBCard background='dark' className='text-white'>
            <MDBCardImage overlay  src={`${process.env.PUBLIC_URL}/assets/raffle1.jpeg`}  alt='...' />
            <MDBCardOverlay >
                <MDBCardTitle className='display-3 text-center mt-50'>Raffle Drawing</MDBCardTitle>
                <MDBCardText className='text-center'>
                Quarterly Drawing
                </MDBCardText>
                {/* <MDBCardText>Last updated 3 mins ago</MDBCardText> */}
            </MDBCardOverlay>
          </MDBCard>
            <div className={"container w-80 mt-5"}>
                <div className={"container w-50 mt-5"}>
                <form onSubmit={(e) => this.sendQuestions(e)}>
                         <Form.Group>
                            <Form.Label>Select Year:</Form.Label>
                            <InputGroup>
                                <Form.Control as="select" required
                                              value={this.state.userType}
                                              onChange={(e) => this.handleUserTypeChange(e)}>
                                    <option value=""> - </option>
                            
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Select Quarter:</Form.Label>
                            <InputGroup>
                                <Form.Control as="select" required
                                              value={this.state.userType1}
                                              onChange={(e) => this.handleUserType1Change(e)}>
                                    <option value=""> - </option>
                            
                                    <option value="1">Quarter 1</option>
                                    <option value="2">Quarter 2</option>
                                    <option value="3">Quarter 3</option>
                                    <option value="4">Quarter 4</option>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        <FormControlLabel
                                        control={<Checkbox value="remember"
                                                           color="primary"
                                                           onChange={(e) => this.handleCheckboxChange(e)}/>}
                                        label="Save the records"
                                    />

                    <div className="col-md-12 text-center mt-5">
                        {/* <EventSelectionForRaffle
                            onSelectEvent = {this.changeEventNameWith}
                        /> */}
                    
                        <button className={"btn btn-primary mt-2 "}
                            type="submit">Draw Raffle Winner!</button>
                    </div>
                </form>
                </div>
               {this.state.doShow ? 
                 <>
                    <div  className={"mt-5 ml-5 mr-5"}>
                        <MaterialTable
                            title={<Typography variant="h4" component="h5">
                                Winners of top point accumulator
                            </Typography>}
                            columns={this.state.columns}
                            data = {this.state.pp.slice(0, 4)}
                            // actions = {[ {
                            //     icon : 'info',
                            //     tooltip: 'Click for event information',
                            //     onClick: ( e,rowData ) => this.goToEventPage(e,rowData.name)
                            // }]}
                        ></MaterialTable>
                    </div>
                    <div  className={"mt-5 ml-5 mr-5"}>
                        <MaterialTable
                            title={<Typography variant="h4" component="h5">
                                Winners of quarterly raffle drawing
                            </Typography>}
                            columns={this.state.columns}
                            data = {this.state.pp.slice(4, 9) }
                            // actions = {[ {
                            //     icon : 'info',
                            //     tooltip: 'Click for event information',
                            //     onClick: ( e,rowData ) => this.goToEventPage(e,rowData.name)
                            // }]}
                        ></MaterialTable>
                    </div>
                    </>
                : null}


                {isOpenBackdrop ? <SimpleBackdrop
                                    handleOpen = {isOpenBackdrop}
                                    handleClose = {this.closeBackdrop}>
                </SimpleBackdrop> : null}
                {isMessageBoxOpen ?  <CustomizedSnackbar
                                    vertical={"bottom"}
                                    horizontal={"right"}
                                    open = {isMessageBoxOpen}
                                    handleClose = {this.closeMessageBox}
                                    message={message}
                                    messageType={messageType}/>: null}
                {this.isRaffleEnded() ?
                    <RaffleInformation selectedEvent={selectedEvent}
                                        raffleWinnerUsername = {raffleWinnerUsername}/> : null}
            </div>
            </>
        );
    }
}

export default EventRaffleQ;