import React, {Component, useState} from 'react';
import {Navbar, Nav,Button,Form,FormControl} from 'react-bootstrap'
import {Link,NavLink} from 'react-router-dom';
import Consumer from '../components/ContextAPI/Context';
import {isOrganizator, isLogin, isParticipant} from "../Authentication";

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
                            
                            // <MDBNavbar sticky expand='lg' dark style = {navbar} >
                            //     <MDBContainer fluid>
                            //     <MDBNavbarBrand href='/'>[SEAS] School Event Award System</MDBNavbarBrand>
                            //     <MDBNavbarToggler
                            //         type='button'
                            //         data-target='#navbarColor02'
                            //         aria-controls='navbarColor02'
                            //         aria-expanded='false'
                            //         aria-label='Toggle navigation'
                                   
                            //     >
                            //     <MDBIcon icon='bars' fas />
                            //     </MDBNavbarToggler>
                            //     <MDBCollapse  navbar>
                            //         <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                            //         <MDBNavbarItem className='active'>
                            //         { isLogin() ?  <MDBNavbarLink aria-current='page' href='#'>
                            //             Home
                            //             </MDBNavbarLink>  : null}
                            //         </MDBNavbarItem>
                            //         <MDBNavbarItem>
                            //             <MDBNavbarLink href='/login'>Features</MDBNavbarLink>
                            //         </MDBNavbarItem>
                            //         <MDBNavbarItem>
                            //             <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
                            //         </MDBNavbarItem>
                            //         <MDBNavbarItem>
                            //             <MDBNavbarLink href='#'>About</MDBNavbarLink>
                            //         </MDBNavbarItem>
                            //         </MDBNavbarNav>
                            //     </MDBCollapse>
                            //     </MDBContainer>
                            // </MDBNavbar>


                            <Navbar style = {navbar}  className = {"p-3"} variant = "dark">
                                <Navbar.Brand href="/">[SEAS] School Event Award System</Navbar.Brand>
                                <Link className = {isLogin() ? "nav-item text-white ml-5": "d-none"}>
                                Welcome {localStorage.getItem("username")} Role: {localStorage.getItem("authorities")} </Link>
                                        <Nav className="ml-auto">
                                            { !isLogin() ? <Link className ="nav-link" to = {"/login"}>Sign In</Link> : null}
                                            { !isLogin() ? <Link className ="nav-link" to = {"/register"}>Sign Up</Link> : null}
                                                                    
                                            <Link className = {isLogin() ? "nav-link": "d-none"}
                                                to ={"/events"} >Events </Link>
                                            {  isOrganizator() ? <Link className ="nav-link"
                                                to = {"/raffle"}>Raffle Drawing</Link> : null}
                                            {  isOrganizator() ? <Link className ="nav-link"
                                                to = {"/raffleQ"}>Q Raffle Drawing</Link> : null}
                                            {  isOrganizator() ? <Link className ="nav-link"
                                                to = {"/chart"}>Charts</Link> : null}
                                            { isOrganizator() ? <Link className ="nav-link"
                                               to = {"/report"}>Report</Link> : null}

                                            {/* { isOrganizator() ? <Link className ="nav-link"
                                                to = {"/survey"}>Surveys</Link> : null} */}

                                            <Link className = { isParticipant() ? "nav-link": "d-none"}
                                                to ={`/myEvents/${localStorage.getItem('username')}`}>
                                                My Events</Link>
                                            <Link className = { isParticipant() ? "nav-link": "d-none"}
                                                to ={`/myReport/${localStorage.getItem('username')}`}>
                                                Report</Link>
                                            <Link className = { isLogin() ? "nav-link": "d-none"}
                                                            to ={"/login"}>
                                            Sign out</Link>

                                        </Nav>
                                <Form inline>

                                </Form>
                            </Navbar>

                      
                        );
                    }
                }
            </Consumer>
        );
    }
}

export default NavigationBar;