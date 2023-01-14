import React, {Component,useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LoginPageImage from "./static/LoginPageImage";
import LoginForm from "./Forms/LoginForm";
import Consumer from './ContextAPI/Context';

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';

class Login extends Component {

    state = {
        isVisible : true
    }

    /*
    *                         */
    resetAuthenticationValues = (dispatch) => {
        this.setState({
            isVisible : false
        })
        localStorage.clear();
        dispatch({type :"resetAuthenticationValues", payload : ""});

    }


    render() {
        const root = {
            height : '100vh',

        };
        return (
            // <LoginForm></LoginForm>

            <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
      
               
            <Consumer>
                {
                    value =>{
                        const {dispatch}  = value;
                        
                        return(
                            // <Grid container component="main" style={root}>
                            //     {this.state.isVisible ? this.resetAuthenticationValues(dispatch) : null}
                            //     <CssBaseline/>
                            //     <LoginPageImage/>
                                
                            //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sqare>
                            <div>
                                    {this.state.isVisible ? this.resetAuthenticationValues(dispatch) : null}
                                    <LoginForm></LoginForm>
                            </div>
                        
                            //     </Grid>
                            // </Grid>

                        );
                    }
                }
            </Consumer>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

            </MDBRow>
            </MDBCardBody>
            </MDBCard>

            </MDBContainer>
        );
    }
}

export default Login;