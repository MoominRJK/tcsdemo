import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
class ParticipantsOfEvent extends Component {
    state = {
        columns: [
            { title: 'First Name', field: 'name' },
            { title: 'Last Name', field: 'surname'},
            { title: 'Student ID', field: 'tcKimlikNo'},
            {title : 'Username', field : 'username'},
        ],
        participants : [],
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
            participants : response.data
        })
    }

    render() {
        return (
            <div  className={"container w-75 mt-5"}>
                <MaterialTable
                    title={<Typography variant="h4" component="h5">
                        User List
                    </Typography>}
                    columns={this.state.columns}
                    data = {this.state.participants}
                    actions = {[ {
                            icon : 'info',
                            tooltip: 'See the users information and questions answered about the event' +
                                'click for',
                    }]}
                    ></MaterialTable>
            </div>
        );
    }
}

export default ParticipantsOfEvent;