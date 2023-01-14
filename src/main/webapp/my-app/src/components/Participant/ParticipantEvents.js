import React, {Component} from 'react';
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {withRouter} from 'react-router-dom';

class ParticipantEvents extends Component {

    state = {
        events : [],
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Start Date', field: 'startDate', type : 'date'},
            { title: 'End Date', field: 'endDate', type : 'date'},
            {title : 'Address', field : 'address'},
        ],

    }

    componentDidMount = () =>  {
        this.getEventsOfParticipant();
    }

    getEventsOfParticipant = async () => {
        const participantUsername = localStorage.getItem('username');
        console.log(participantUsername);
        const response = await axios.get(`/eventsOfParticipant/${participantUsername}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });

        this.setState({
            events : response.data
        })
    }

    goToEventPage = (e,eventName) =>{
        this.props.history.push(`/event/${eventName}`)
    }

    render() {
        return (
            <>
            <div  className={"mt-5 ml-5 mr-5"}>
                <MaterialTable
                    title={<Typography variant="h4" component="h5">
                        My Events
                    </Typography>}
                    columns={this.state.columns}
                    data = {this.state.events.filter(event => new Date(event.endDate) > new Date()) }
                    actions = {[ {
                        icon : 'info',
                        tooltip: 'Click for event information',
                        onClick: ( e,rowData ) => this.goToEventPage(e,rowData.name)
                    }]}
                ></MaterialTable>
            </div>
            <div  className={"mt-5 ml-5 mr-5"}>
                <MaterialTable
                    title={<Typography variant="h4" component="h5">
                        My Past Events
                    </Typography>}
                    columns={this.state.columns}
                    data = {this.state.events.filter(event => new Date(event.endDate) <= new Date()) }
                    actions = {[ {
                        icon : 'info',
                        tooltip: 'Click for event information',
                        onClick: ( e,rowData ) => this.goToEventPage(e,rowData.name)
                    }]}
                ></MaterialTable>
            </div>
            </>
        );
    }
}

export default withRouter(ParticipantEvents);