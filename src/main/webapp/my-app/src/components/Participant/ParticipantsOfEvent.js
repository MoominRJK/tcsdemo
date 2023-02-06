import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
class ParticipantsOfEvent extends Component {
    state = {
        columns: [
            { title: 'First Name', field: 'name', headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              } },
            { title: 'Last Name', field: 'surname',  headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              }},
            { title: 'Grade', field: 'grade' , headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              }},
            {title : 'Email', field : 'email',  headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              }},
        ],
        participants : [],
        eventName: ''
    }

    componentDidMount = () =>{
        this.getParticipantsOfEvent();
    }

    getParticipantsOfEvent = async () =>{
        const {eventName}  = this.props.match.params;
        const response = await axios.get(`/participants/${eventName}`, {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('jwtToken')
            }
        }).catch(err => {
            this.props.history.push('/notFound404');
        });
        this.setState({
            participants : response.data,
            eventName: eventName
        })
    }

    render() {
       

        return (
            <div  className={"mr-5 ml-5 mt-5"}>
                <MaterialTable
                    title={<Typography variant="h4" component="h5">
                       {this.state.eventName} Participant List
                    </Typography>}
                    columns={this.state.columns}
                    data = {this.state.participants}
                    // actions = {[ {
                    //         icon : 'info',
                    //         tooltip: 'See the users information and questions answered about the event' +
                    //             'click for',
                    // }]}
                    ></MaterialTable>
            </div>
        );
    }
}

export default ParticipantsOfEvent;