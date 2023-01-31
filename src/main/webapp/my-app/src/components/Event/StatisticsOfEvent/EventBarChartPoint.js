import React, {Component} from 'react';
import axios from 'axios';
import {Form, InputGroup} from "react-bootstrap";
import EventSelectionForStatistics from "./EventSelectionForStatistics";
import EventBarChart from './EventBarChart'
import {getEventPoints, getEvents} from "../../../HelperFunctions/EventHelpers";
import CountUp from 'react-countup';
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
    MDBBadge,

    MDBCardImage,

    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,

  } from 'mdb-react-ui-kit';
class EventBarChartPoint extends Component {

    state = {
        statisticsType : '',
        eventName : '',
        events : [],
        participationCountsOfEvents :  [],
        eventNames : [],
        isOpenedEventBarChart : false,
        participationDates : [],
        userType : '',
        userType1 : '',
        saveReocrd : false,
        pp: [],
    }


    componentDidMount = async () => {
        //  const response = await getEventPoints(2022, 4);
        //  this.setState({
        //      events: response.data
        //  })
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
        e.preventDefault();
        const {statisticsType,eventName,events} = this.state;
        if(statisticsType === 'showGraphicsWithParticipationCount') {
            this.setParticipationCountsOfEvents();
            this.setNamesOfEvents();
        }

        else if(statisticsType === 'showGraphicsWithParticipationDate') {
            this.getParticipationDatesAndParticipantCounts(eventName);
        }
        this.openEventChart();
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


    sendQuestions = async (e) => {
       
        e.preventDefault();
            const {userType, userType1, saveReocrd} = this.state;
            const response = await axios.get(`/point/${userType}/${userType1}`, {
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('jwtToken')
                }
            }).catch(err => {
                this.props.history.push('/notFound404');
            });

            this.setState({
                pp: response.data,
                events : response.data,
                isOpenedEventBarChart: true
            })

            const {events} = this.state;
            var participationCountsOfEvents = events.map(event => event.totalPoint);
            this.setState({
                participationCountsOfEvents : participationCountsOfEvents
            })

            var names = events.map(event => event.firstName);
            this.setState({
                eventNames : names
            })

    }

    handleUserTypeChange = (e) => {
        this.setState({
            userType : e.target.value
        })
    }

    handleUserType1Change = (e) => {
        this.setState({
            userType1 : e.target.value
        })
    }

    render() {
        const {statisticsType,isOpenedEventBarChart} = this.state;
        return (
            <div className={"container  w-75 mt-5"}>


                    <div className='text-center mb-3' >
                                                        <h1 className='text-white'>Dashboard</h1>
                                                        </div>
                        <MDBRow className='row-cols-1 row-cols-md-4 g-4 mb-5'>
                        
                        <MDBCol>
                            <MDBCard className='h-100'>
                            
                            <MDBCardBody className='bg-success shadow-1-strong'>
                                <MDBCardTitle><h1 className= 'text-white text-center'><CountUp start={0} end={15} /></h1></MDBCardTitle>

                            </MDBCardBody>
                            <MDBCardFooter className='bg-success shadow-1-strong'>
                                <h6 className= 'text-white text-center'>Events</h6>
                            </MDBCardFooter>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol>
                            <MDBCard className='h-100 text-black'>
                            
                            <MDBCardBody className='bg-warning shadow-1-strong'>
                                <MDBCardTitle><h1 className= 'text-black text-center'><CountUp start={0} end={14} /></h1></MDBCardTitle>

                            </MDBCardBody>
                            <MDBCardFooter className='bg-warning shadow-1-strong'>
                                <h6 className= 'text-black text-center'>Users</h6>
                            </MDBCardFooter>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol>
                            <MDBCard className='h-100'>
                            
                            <MDBCardBody className='bg-info shadow-1-strong'>
                                <MDBCardTitle><h1 className= 'text-white text-center'><CountUp start={0} end={41} /></h1></MDBCardTitle>


                            </MDBCardBody>
                            <MDBCardFooter className='bg-info shadow-1-strong'>
                                <h6 className= 'text-white text-center'>Total Participants</h6>
                            </MDBCardFooter>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol>
                            <MDBCard className='h-100'>
                            
                            <MDBCardBody className='bg-danger shadow-1-strong'>
                                <MDBCardTitle><h1 className= 'text-white text-center'><CountUp start={0} end={16} /></h1></MDBCardTitle>


                            </MDBCardBody>
                            <MDBCardFooter className='bg-danger shadow-1-strong'>
                                <h6 className= 'text-white text-center'>Total Prizes</h6>
                            </MDBCardFooter>
                            </MDBCard>
                        </MDBCol>
                        
                        </MDBRow>




                    <div className={"container w-50 mt-5 text-white mb-5"}> 
                        <h3>Student Quarterly Reward Points</h3> 
                            <form onSubmit={(e) => this.sendQuestions(e)}>
                                <Form.Group>
                                    <Form.Label>Select Year:</Form.Label>
                                    <InputGroup>
                                        <Form.Control as="select" required
                                                    value={this.state.userType}
                                                    onChange={(e) => this.handleUserTypeChange(e)}>
                                            <option value=""> - </option>
                                    
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                        </Form.Control>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Select Quarter:</Form.Label>
                                    <InputGroup>
                                        <Form.Control as="select" required
                                                    value={this.state.userType1}
                                                    onChange={(e) => this.handleUserType1Change(e)}>
                                            <option value=""> - </option>
                                    
                                            <option value="1"> 1st Quarter</option>
                                            <option value="2"> 2nd Quarter</option>
                                            <option value="3"> 3rd Quarter</option>
                                            <option value="4"> 4th Quarter</option>
                                        </Form.Control>
                                    </InputGroup>
                                </Form.Group>

                            <div className="col-md-12 text-center mt-5">
                                {/* <EventSelectionForRaffle
                                    onSelectEvent = {this.changeEventNameWith}
                                /> */}
                            
                                <button className={"btn btn-primary mt-2 "}
                                    type="submit">Submit</button>
                            </div>
                            </form>
                </div>
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
                                    <option value="showGraphicsWithParticipationCount">Events Registered Participants</option>
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


             {/* <ul>
                  {this.state.pp.map(d => (<li key={d.firstName}>{d.lastName}</li>))} 
            </ul> */}



            <MDBRow>

            {this.state.pp.map(d => 
                (
                // <li key={d.firstName}>{d.lastName}</li>
                
                <MDBCol xl={4} lg={6} className='mb-4'  key={d.name}>
                <MDBCard>
                <MDBCardBody className= 'text-black'>
                <div className='d-flex justify-content-between align-items-center text-left'>
                        <div class="circle" >
                                <p class="circle-inner">{d.firstName[0]}</p>
                               
                        </div>
                        <div className='ms-3 ml-1 '>
                            <p className='fw-bold mb-1'> {d.firstName} {d.lastName}</p>
                     
                        </div>

                        </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        {/* <img
                            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                        ></img> */}
                       

                        <div className='ms-3 ml-1'>
                            <p className='fw-bold mb-1'> Email</p>
                            <p className='text-muted mb-0'>{d.email}</p>
                        </div>
                        <div className='ms-3'>
                                <p className='fw-bold mb-1'>Grade</p>
                                <p className='text-muted mb-0 ml-3'>{d.grade}</p>
                        </div>
                    
                   
                        <div className='d-flex'>
                            <MDBBadge pill light className= 'ml-4 ms-2' color='success'>
                                {d.totalPoint}
                            </MDBBadge>
                        </div>
                    </div>
                </MDBCardBody>
                </MDBCard>
              </MDBCol> 
                
                ))} 
                 
            </MDBRow>
                 
                {/* {(isOpenedEventBarChart) ?
                    <EventBarChart
                        labels = {this.state.eventNames}
                        label = "Total Reward Points"
                        data = {this.state.participationCountsOfEvents}/> : null} */}
                {/* {(isOpenedEventBarChart) ?
                    <EventBarChart
                        labels = {this.state.participationDates}
                        label = "The number of participants"
                        data = {this.state.participationCountsOfEvents}/> : null} */}

            </div>
        );
    }
}

export default EventBarChartPoint;