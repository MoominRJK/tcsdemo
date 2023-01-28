import React, {Component, useState} from 'react';
import {Navbar, Nav,Button,Form,FormControl} from 'react-bootstrap'
import {Link,NavLink} from 'react-router-dom';
import Consumer from '../components/ContextAPI/Context';
import {isOrganizator, isLogin, isParticipant} from "../Authentication";
import Container from 'react-bootstrap/Container';

import NavDropdown from 'react-bootstrap/NavDropdown';

import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
  } from 'mdb-react-ui-kit';
class NavigationBar extends Component {


    render() {
        const navbar = {
            backgroundColor : "#6416FF",
            fontSize : "17px",
            letterSpacing : "1px",
            fontWeight : "500",
            
        }
        const font = {
            fontSize: "15px"
        }


        return (
            <Consumer>
                {
                    value => {
                        const {dispatch,username,authorities} = value;
                        return(
                           

                            <>
                            <Navbar  sticky="top" style = {navbar} collapseOnSelect expand="lg" variant="dark">
                                    
                                        <Navbar.Brand href="/">[SEAS] School Event Award System</Navbar.Brand>
                                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                        <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto nav-item text-white ml-5 mt-1">
                                           
                                           
                                            {/* <Link className = {isLogin() ? "nav-link": "d-none"}
                                                to ={"/events"} >Events </Link> */}
                                           
                                            {  isOrganizator() ? <Link className ="nav-link"
                                                to = {"/eventsAdmin"}>Manage Events</Link> : null}

                                            {  isOrganizator() ?            
                                            <NavDropdown title="Raffle" id="collasible-nav-dropdown">
                                                <NavDropdown.Item href="/raffle">Onsite Raffle Drawing</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="/raffleQ">
                                                    Quarterly Raffle Drawing
                                                </NavDropdown.Item>
                                               
                                            </NavDropdown>
                                            : null}

                                            {/* {  isOrganizator() ? <Link className ="nav-link"
                                                to = {"/raffle"}>Raffle Drawing</Link> : null}
                                            {  isOrganizator() ? <Link className ="nav-link"
                                                to = {"/raffleQ"}>Q Raffle Drawing</Link> : null} */}
                                            {  isOrganizator() ? <Link className ="nav-link"
                                                to = {"/chart"}>Charts</Link> : null}
                                            { isOrganizator() ? <Link className ="nav-link"
                                               to = {"/report"}>Report</Link> : null}
                                            { isOrganizator() ? <Link className ="nav-link"
                                               to = {"/allPrize"}>Manage Prize</Link> : null}
                                            
                                            {/* { isOrganizator() ? <Link className ="nav-link"
                                                to = {"/survey"}>Surveys</Link> : null} */}
                                            {  isParticipant() ? <Link className ="nav-link"
                                                to = {"/events"}>Events</Link> : null}
                                            <Link className = { isParticipant() ? "nav-link": "d-none"}
                                                to ={`/myEvents/${localStorage.getItem('username')}`}>
                                                My Events</Link>
                                            {  isParticipant() ? <Link className ="nav-link"
                                                to = {"/prize"}>Prizes</Link> : null}
                                            <Link className = { isParticipant() ? "nav-link": "d-none"}
                                                to ={`/myReport/${localStorage.getItem('username')}`}>
                                                Report</Link>

                                            
                                        </Nav>
                                        <Nav className="ml-auto nav-item text-white ml-5 mt-1">
                                            { !isLogin() ? <Link className ="nav-link" to = {"/login"}>Sign In</Link> : null}
                                            { !isLogin() ? <Link className ="nav-link" to = {"/register"}>Sign Up</Link> : null}
                                            
                                            <Navbar.Text className={ isLogin() ? "nav-link text-white ": "d-none"}>
                                                    Signed in as: <a href="#">{localStorage.getItem("username")} </a>
                                            </Navbar.Text>
                                            
                                            <Link className = { isLogin() ? "nav-link": "d-none"}
                                                            to ={"/login"}>
                                            Sign out</Link>
                                            
                                        </Nav>
                                        </Navbar.Collapse>
                                  
                            </Navbar>









  
                            </>

                      
                        );
                    }
                }
            </Consumer>
        );
    }
}

export default NavigationBar;