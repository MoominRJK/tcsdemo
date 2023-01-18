import React, {Component} from 'react';
import EventNavLink from './EventNavLink'
import { Link} from 'react-router-dom';
import {isOrganizator, isParticipant} from "../../Authentication";
class EventNavbar extends Component {

    constructor(props) {
        super(props);
    }

    navigateEventToRelatedPart = (e) =>{
        var newLink = e.target.textContent;
        this.props.handleNavigation(newLink);
    }

    isEventAlreadyStarted = () =>{
        const {startDate} = this.props.event;
        var currentDate = new Date();
        return currentDate > new Date(startDate);
    }

    render() {
        return (
                <ul className="nav nav-tabs card-header-tabs" role="tablist">
                    <EventNavLink name ="Details"
                                  handleClick = {(e) =>this. navigateEventToRelatedPart(e)}></EventNavLink>
                    {/* <EventNavLink name ="Location"
                                  handleClick = {(e) =>this.navigateEventToRelatedPart(e)}></EventNavLink> */}
                    {/* <EventNavLink name ="Questionnaire"
                                  handleClick = {(e) =>this.navigateEventToRelatedPart(e)}></EventNavLink>
                    <EventNavLink name ="Event Specific Questions"
                                  handleClick = {(e) => this.navigateEventToRelatedPart(e)}></EventNavLink> */}
                    {(isParticipant() && !this.isEventAlreadyStarted()) ?  <EventNavLink name ="Join the Event"
                                  handleClick = {(e) => this.navigateEventToRelatedPart(e)}></EventNavLink> : null }
                  {/* <EventNavLink name ="Join the Event"
                                  handleClick = {(e) => this.navigateEventToRelatedPart(e)}></EventNavLink>  */}
                </ul>
        );
    }
}

export default EventNavbar;