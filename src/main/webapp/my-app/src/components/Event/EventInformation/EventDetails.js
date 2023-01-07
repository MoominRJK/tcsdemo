import React, {Component} from 'react';
import {isOrganizator} from "../../../Authentication";
import axios from 'axios';
import {withRouter} from "react-router-dom";
class EventDetails extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        lecturerUsername : '',
    }

    componentDidMount = () => {
      // this.getLecturerOfEvent();
    }

    getLecturerOfEvent = async () =>{
        const { eventName } = this.props.match.params;
        const response = await axios.get(`/lecturer/of/${eventName}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });

        this.setState({
            lecturerUsername : response.data.username
        })
    }

    render() {
        const {name,startDate,endDate,
               raffleWinnerUsername,quota,currentNumberOfPeople,  
               point,
               eventType} = this.props.event;
        return (
            <div className={"container mb-3 mt-3"}>
                <h3 className={"card-title text-center"}>Event Details</h3>
                <div className="row">
                    <div className="col">
                        <strong>Name :</strong>
                        <p className={"ml-3 d-inline"}>{name}</p>
                    </div>
                    <div className="col">
                        <strong>Starting date :</strong>
                        <p className={"ml-3 d-inline"}>{startDate}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <strong>Event Type :</strong>
                            <p className={"ml-3 d-inline"}>
                                {eventType}              
                        </p>
                    </div>
                    <div className="col">
                        <strong>End Date :</strong>
                        <p className={"ml-3 d-inline"}>{endDate}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <strong>Quota :</strong>
                            <p className={"ml-3 d-inline"}>
                                {quota}
                                {quota == currentNumberOfPeople ?
                                    <strong className={"text-danger"}> (Full of Activity) </strong> : null}
                        </p>
                    </div>
                    <div className="col">
                        <strong>Current number of participants :</strong>
                        <p className={"ml-3 d-inline"}>{currentNumberOfPeople}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <strong>Award Point:</strong>
                            <p className={"ml-3 d-inline"}>
                                {point}
                        </p>
                    </div>
                </div>
  
                {isOrganizator() ?
                    <div>
                        <div className={"row"}>
                            <div className="col">
                                <strong>Organizer Username :</strong>
                                <p className={"ml-3 d-inline"}>{localStorage.getItem("username")}</p>
                            </div>
                            <div className="col">
                                <strong>The winner of the lottery at the event:</strong>
                                <p className={"ml-3 d-inline"}>{raffleWinnerUsername}</p>
                            </div>
                        </div>
                    </div>: null }




            </div>
        );
    }
}

export default withRouter(EventDetails);