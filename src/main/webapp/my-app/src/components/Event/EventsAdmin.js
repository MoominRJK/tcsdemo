import React, {Component} from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import {Redirect, withRouter} from "react-router-dom";
import EventTable from "./EventTable"
import InfoIcon from '@material-ui/icons/Info';
import Consumer from '../ContextAPI/Context'
import EventsOfLecturer from "../Lecturer/EventsOfLecturer";
import {isLecturer, isOrganizator, isParticipant} from "../../Authentication";

class EventsAdmin extends Component {

    render() {
        return(<Consumer>
                {
                    value => {
                        const {events} = value;
                        return (
                            <div className={"mt-5"}>
                      
                                {<EventTable events = {events} />}

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

export default withRouter(EventsAdmin);

