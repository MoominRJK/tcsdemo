import React, {Component} from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import {withRouter} from "react-router-dom";


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

class RaffleInformation extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
         this.updateEventWithTheRaffleUsername();
         this.sendEmailToRaffleWinner();
       
    }

    updateEventWithTheRaffleUsername = async () => {
        const {selectedEvent} = this.props;
        console.log(selectedEvent);
        const response = await axios.put(`/events/${selectedEvent.name}`, selectedEvent,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        console.log(response.data);

    }

    getRaffleWinnerFullName = async () => {
        const {selectedEvent,raffleWinnerUsername} = this.props;
        const response = await axios.post(`/participant/${raffleWinnerUsername}`,
            selectedEvent, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })

        this.setState({
            participant : response.data
        })
    }

    sendEmailToRaffleWinner = async () => {
        const {selectedEvent,raffleWinnerUsername} = this.props;
        const response = await axios.post(`/sendEmail/toRaffleWinner/${raffleWinnerUsername}`,
            selectedEvent, {
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                }
            }).catch(err => {
            this.props.history.push("/notFound404");
        })
    }

    render() {
        const {raffleWinnerUsername, raffleWinnerFullname} = this.props;
        return (
            <div className={"container mt-5"}>
                {/* <Alert severity="info"> {raffleWinnerFullname} is today's event raffle winner.
                The winner has been notified by the e-mail.</Alert> */}
                <MDBCard background='dark' className='text-white'>
                <MDBCardImage overlay  src={`${process.env.PUBLIC_URL}/assets/winner.png`}  alt='...' />
                <MDBCardOverlay >
               
                <MDBCardText className='text-center display-5'>
                    Today's event raffle winner:
                </MDBCardText>
                    <MDBCardTitle className='display-3 text-center text-danger mt-50'> {raffleWinnerFullname} </MDBCardTitle>
                   
                   
                </MDBCardOverlay>
             </MDBCard>
            </div>
        );
    }
}

export default withRouter(RaffleInformation);