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
            <div  className={"container w-75 mt-5"}>
                <MaterialTable
                    title={<Typography variant="h4" component="h5">
                        List of Your Events
                    </Typography>}
                    columns={this.state.columns}
                    data = {this.state.events}
                    actions = {[ {
                        icon : 'info',
                        tooltip: 'Click for event information',
                        onClick: ( e,rowData ) => this.goToEventPage(e,rowData.name)
                    }]}
                ></MaterialTable>
            </div>
        );
    }
}

export default withRouter(ParticipantEvents);