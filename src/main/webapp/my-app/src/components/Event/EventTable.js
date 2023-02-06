import React, {Component} from 'react';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import {isOrganizator, isParticipant} from "../../Authentication";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import PositionedSnackbar from "../static/Snackbars/PositionedSnackbar";
import UpdateEventForm from "./Forms/UpdateEventForm";
import Consumer from '../ContextAPI/Context';
import EventCard from './EventCard';


import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBRow,
    MDBCol,
    MDBContainer

  } from 'mdb-react-ui-kit';

class EventTable extends Component {
    state = {
        columns: [
            { title: 'Name', field: 'name',
              headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              }
            },
            { title: 'Event Date', field: 'startDate', type : 'date',
            headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              }},
            { title: 'Reward Point', field: 'point', 
            headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              }},
            { title : 'Location', field : 'location',
            headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              }},
        ],

        isAdditionRequest : false,
        isDeleteRequest : false,
        isUpdateRequest : false,
        responseMessageOfDeleteRequest : '',
        responseMessageTypeOfDeleteRequest  : '',
        updatedEventName: '',

        events: [
            {
              id: 1,
              time: "10:00",
              title: "Breakfast with Simon",
              location: "Lounge Caffe",
              description: "Discuss Q3 targets"
            },
            {
              id: 2,
              time: "10:30",
              title: "Daily Standup Meeting (recurring)",
              location: "Warsaw Spire Office"
            },
            { id: 3, time: "11:00", title: "Call with HRs" },
            {
              id: 4,
              time: "11:00",
              title: "Lunch with Timothy",
              location: "Canteen",
              description:
                "Project evaluation ile declaring a variable and using an if statement is a fine way to conditionally render a component, sometimes you might want to use a"
            }
          ]
        
          
    }

    deleteEvent = async  (e,eventName,dispatch) =>{

        e.preventDefault();
        axios.delete(`/events/delete/${eventName}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtToken")
            },
            data: {
                name: eventName
            }
        }).then(response => {
            this.showMessageOfDeleteRequest(response.data);
            setTimeout(() => {
                this.setState({
                    isDeleteRequest : false,
                })
                if(this.isDeletionSuccess(response.data.messageType)) {
                    dispatch({ type: 'deleteEvent', payload: eventName })
                }
            }, 3000);
        }).catch(err => {
           this.props.history.push("/notFound404");
        });

    }
    showMessageOfDeleteRequest = (messageResponse) =>{
        this.setState({
            isDeleteRequest : true,
            responseMessageOfDeleteRequest : messageResponse.message,
            responseMessageTypeOfDeleteRequest : messageResponse.messageType
        })

    }
    isDeletionSuccess = (messageType) =>{
        return messageType === "SUCCESS"
    }

    openUpdateModal = (e,eventName) =>{
        this.setState({
            isUpdateRequest : true,
            updatedEventName : eventName
        })
    }

    closeUpdateModal = () =>{
        this.setState({
            isUpdateRequest: false,
        })

    }

    goToEventPage = (e,eventName) =>{
        this.props.history.push(`/event/${eventName}`)
    }

    goToEventParticipantPage = (e,eventName) =>{
        this.props.history.push(`/participants/${eventName}`)
    }


    render() {
        //const cardInfo = this.events



        const{isAdditionRequest,updatedEventName,isUpdateRequest,isDeleteRequest,
        responseMessageOfDeleteRequest, responseMessageTypeOfDeleteRequest} = this.state;
        let username = localStorage.getItem("username");
        return(<Consumer>
            {
                value => {
                    const {dispatch,events} = value;
                    return(
                        <div className={"ml-5 mr-5"}>
                            {/* <MaterialTable
                                title={<Typography variant="h4" component="h5">
                                            Event List
                                        </Typography>}
                                columns={this.state.columns}
                                data={ this.props.events}
                                // data={isParticipant() ?
                                //      events.filter(event => new Date(event.startDate) > new Date()) : this.props.events}
                                actions={[
                                    isOrganizator()  ?
                                        {
                                            icon :  'delete',
                                            tooltip: 'Delete',
                                            onClick: (e, rowData,) => this.deleteEvent(e,rowData.name,dispatch)
                                        } : null,
                                    {
                                        icon : 'info',
                                        tooltip: 'To participate in the event or to enter the event information ' +
                                        'click to view',
                                        onClick: ( e,rowData ) => this.goToEventPage(e,rowData.name)
                                    },
                                    isOrganizator()  ?
                                        {
                                            icon :  'edit',
                                            tooltip: 'Update event',
                                            onClick : (e, rowData) => this.openUpdateModal(e,rowData.name)
                                        } : null ,
                                    isOrganizator() ?
                                        {
                                            icon: 'add',
                                            tooltip: 'Add event',
                                            isFreeAction: true ,
                                            onClick : (event) => this.setState({
                                                isAdditionRequest : true,
                                            })
                                        } : null

                                ]}
                            /> */}
                            <MaterialTable
                                     title={<Typography variant="h4" component="h5">
                                     Event List
                                 </Typography>}
                                    columns={[
                                        { title: 'Name', field: 'name',
                                          headerStyle: {
                                            backgroundColor: '#039be5',
                                            color: '#FFF'
                                          }
                                        },
                                        { title: 'Start Date', field: 'startDate', type : 'date',  headerStyle: {
                                            backgroundColor: '#039be5',
                                            color: '#FFF'
                                          }},
                                        { title: 'Start Time', field: 'startTime', type : 'date',  headerStyle: {
                                            backgroundColor: '#039be5',
                                            color: '#FFF'
                                          }},
                                        {title : 'Where', field : 'location', headerStyle: {
                                            backgroundColor: '#039be5',
                                            color: '#FFF'
                                          }},
                                          {title : 'Category', field : 'category', headerStyle: {
                                            backgroundColor: '#039be5',
                                            color: '#FFF'
                                            }},
                            
                                        { title: 'Reward Point', field: 'point', 
                                        headerStyle: {
                                            backgroundColor: '#039be5',
                                            color: '#FFF'
                                          }},
                                        { title : 'Seats', field : 'quota',
                                        headerStyle: {
                                            backgroundColor: '#039be5',
                                            color: '#FFF'
                                          }},
                                      
                                        {title : 'Price', field : 'price', headerStyle: {
                                            backgroundColor: '#039be5',
                                            color: '#FFF'
                                            }},
                                    ]}
                                    data={ this.props.events}
                                    actions={[
                                        {
                                            icon : 'info',
                                            tooltip: 'View event details ',
                                            onClick: ( e,rowData ) => this.goToEventPage(e,rowData.name)
                                        },
                                        {
                                            icon : 'man',
                                            tooltip: 'View all participate in the event ' ,
                                            onClick: ( e,rowData ) => this.goToEventParticipantPage(e,rowData.name)
                                        },
                                        {
                                            icon :  'edit',
                                            tooltip: 'Update event',
                                            onClick : (e, rowData) => this.openUpdateModal(e,rowData.name)
                                        },
                                        {
                                            icon :  'delete',
                                            tooltip: 'Delete',
                                            onClick: (e, rowData,) => this.deleteEvent(e,rowData.name,dispatch)
                                        },
                                        {
                                            icon: 'add',
                                            tooltip: 'Add event',
                                            isFreeAction: true ,
                                            onClick : (event) => this.setState({
                                                isAdditionRequest : true,
                                            })
                                        } 
                                    ]}
                                    options={{
                                        actionsColumnIndex: -1,
                                        headerStyle: {
                                            backgroundColor: '#039be5',
                                            color: '#FFF'
                                          },
                                          exportButton: true,
                                          exportAllData: true

                                    }}
                                    />
                            {isAdditionRequest ? this.props.history.push(`/events/${username}`) : null }
                            {isDeleteRequest  ?
                                <PositionedSnackbar
                                    message = {responseMessageOfDeleteRequest}
                                    messageType = {responseMessageTypeOfDeleteRequest}
                                    vertical = {"bottom"}
                                    horizontal = {"right"}/> : null
                            }
                            {isUpdateRequest ?
                                <UpdateEventForm
                                    open = {isUpdateRequest}
                                    handleClose = {this.closeUpdateModal}
                                    eventName = {updatedEventName}/>
                                : null }
    
          
                              

       
                                    
                        </div>

                    );
                }
            }
        </Consumer>)

    }
}

export default withRouter(EventTable);

