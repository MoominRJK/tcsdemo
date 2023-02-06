import React, {Component} from 'react';
import axios from 'axios';
import {Form, InputGroup} from "react-bootstrap";
import EventSelectionForStatistics from "./EventSelectionForStatistics";
import EventBarChart from './EventBarChart'
import {getEventPoints, getEvents} from "../../../HelperFunctions/EventHelpers";
import CountUp from 'react-countup';

import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';
class EventBarMyPoint extends Component {

    state = {
        statisticsType : '',
        eventName : '',
        events : [],
        participationCountsOfEvents :  [],
        eventNames : [],
        isOpenedEventBarChart : false,
        participationDates : [],
        username: localStorage.getItem('username'),
        point: 0,
        
    }


    componentDidMount = async () => {
         const response = await getEventPoints(2022, 4);
         const participantPoints = response.data;
         this.setState({
             events: response.data,
             eventNames: participantPoints.map(event => event.firstName),
             point: participantPoints.filter( p => p.name === localStorage.getItem('username'))[0].totalPoint,
             participationCountsOfEvents: participantPoints.map(event => event.totalPoint),
             
         })

         

        //  this.showStatistics();
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


    handleEventStatisticsChoice = (e) => {
        e.preventDefault();
        this.setState({
            statisticsType : e.target.value,
            isOpenedEventBarChart : false
        })
    }

    changeEventNameWith = (val) =>{
        this.setState({
            eventName : val,
            participationDates : [] // ?????
        })
    }

    showStatistics = (e) =>{
       // e.preventDefault();
        const {statisticsType,eventName,events} = this.state;
     //   if(statisticsType === 'showGraphicsWithParticipationCount') {
        this.setParticipationCountsOfEvents();
        this.setNamesOfEvents();
     ///   }

        // else if(statisticsType === 'showGraphicsWithParticipationDate') {
        //     this.getParticipationDatesAndParticipantCounts(eventName);
        // }
        // this.openEventChart();
    }

    setParticipationCountsOfEvents = () => {
        const {events} = this.state;
        var participationCountsOfEvents = events.map(event => event.totalPoint);
        this.setState({
            participationCountsOfEvents : participationCountsOfEvents
        })
    }
    setNamesOfEvents = () => {
        const {events} = this.state;
        var names = events.map(event => event.firstName);
        this.setState({
            eventNames : names
        })

    }

    getParticipationDatesAndParticipantCounts = async (eventName) =>{
        await axios.get(`/participationDatesAndparticipantCounts/${eventName}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            },
        }).then((response) =>{
            var datesAndCounts = response.data;
            var dates = datesAndCounts.map((date,index) => datesAndCounts[index].partitionDate);
            var counts = datesAndCounts.map((count,index) => datesAndCounts[index].partitionCount);
            this.setState({
                participationDates : dates,
                participationCountsOfEvents : counts
            })
        })
    }
    openEventChart = () =>{
        this.setState({
            isOpenedEventBarChart : true
        })
    }

    render() {
        const {eventNames,participationCountsOfEvents, username, point} = this.state;
        return (
            <div className={"container w-75 mt-5"}>

         <div className='text-center  mb-3' >
                                      <h1 className='text-white'>Dashboard</h1>
                                    </div>
      <MDBRow className='row-cols-1 row-cols-md-4 g-4 mb-5'>
       
      <MDBCol>
        <MDBCard className='h-100'>
         
          <MDBCardBody className='bg-success shadow-1-strong'>
            <MDBCardTitle><h1 className= 'text-white text-center'><CountUp start={0} end={3} /></h1></MDBCardTitle>

          </MDBCardBody>
          <MDBCardFooter className='bg-success shadow-1-strong'>
            <h6 className= 'text-white text-center'> Current Events</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          
        <MDBCardBody className='bg-warning shadow-1-strong'>
            <MDBCardTitle><h1 className= 'text-black text-center'><CountUp start={0} end={481} /></h1></MDBCardTitle>

          </MDBCardBody>
          <MDBCardFooter className='bg-warning shadow-1-strong'>
            <h6 className= 'text-black text-center'>Current Total Points</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          
        <MDBCardBody className='bg-info shadow-1-strong'>
            <MDBCardTitle><h1 className= 'text-white text-center'><CountUp start={0} end={2} /></h1></MDBCardTitle>


          </MDBCardBody>
          <MDBCardFooter className='bg-info shadow-1-strong'>
            <h6 className= 'text-white text-center'>Complete Events</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
        
        <MDBCardBody className='bg-danger shadow-1-strong'>
            <MDBCardTitle><h1 className= 'text-white text-center'><CountUp start={0} end={495} /></h1></MDBCardTitle>


          </MDBCardBody>
          <MDBCardFooter className='bg-danger shadow-1-strong'>
            <h6 className= 'text-white text-center'>Complete Points</h6>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      
    </MDBRow>


                







        
                   {/* <form onSubmit={(e) => this.showStatistics(e)}>
                    <div className="row">
                        <div className="col ">
                            {statisticsType === "showGraphicsWithParticipationDate" ?
                                <EventSelectionForStatistics
                                    onSelectEvent = {this.changeEventNameWith}/> : null }
                        </div>
                        <div className="col">
                            <InputGroup>
                                <Form.Control as="select" required
                                              value={statisticsType}
                                              onChange={(e) => this.handleEventStatisticsChoice(e)}>
                                    <option value="">Create chart</option>
                                    <option value="showGraphicsWithParticipationCount">Show Events by Number of Applicants</option>
                                    <option value="showGraphicsWithParticipationDate">Show by Date of Applications Made to the Event</option>
                                </Form.Control>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="col-md-12 text-center mt-5 mb-5">
                        <button type="submit"
                                className="btn btn-primary">show chart</button>

                    </div>
                </form> */}
               
                    <EventBarChart
                        labels = {['Career Day', 'Chicago Opera Performance', 'Basketball Game', 'International Day', 'Tea party' ]}
                        label = "Total Reward Points"
                        data = {[100, 125,150,345,175]}/>
              
                    {/* <EventBarChart
                        labels = {this.state.participationDates}
                        label = "The number of participants"
                        data = {this.state.participationCountsOfEvents}/> */}

            </div>
        );
    }
}

export default EventBarMyPoint;