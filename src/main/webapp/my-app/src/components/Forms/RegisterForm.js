import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {InputGroup} from "react-bootstrap";
import CustomizedSnackbar from "../static/Snackbars/CustomizedSnackbar";

class RegisterForm extends Component {
    state = {

        userType : '',
        name : '',
        surname : '',
        email : '',
        phone : '',
        password : '',
        repeatedPassword : '',
        schoolId : '',
        birthDate : '',
        username : '',
        currentDate : '',
        message : '',
        messageType : '',
        isOpenMessage : false,
        grade : ''
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendRegisterForm = async (e) =>{
        e.preventDefault();
        const {name,surname,email,phone,username,
            password,userType,birthDate,schoolId, grade} = this.state;
        var newUser = {
            name : name.trim(),
            surname : surname.trim(),
            email : email.trim(),
            phone,
            username : username.trim(),
            password : password.trim(),
            birthDate,
            schoolId,
            grade,
            authorities: []
        }
        if(!this.arePasswordsEqual()) {
            this.setMessageAs("The 2 passwords you typed do not match.","ERROR");
        }
        else {
            const response = await axios.post(`/add/${userType}`,
           //const response = await axios.post(`/add/PARTICIPANT`,
                newUser,
                ).catch(err => {
                this.props.history.push("/notFound404");
            })
           this.setMessageAs(response.data.message,response.data.messageType);
        }
        if(this.isRegistrationSuccessfull()) {
            this.goToLoginPage();
        }
    }

    arePasswordsEqual = () => {
        const {password,repeatedPassword} = this.state;
        return password.trim() === repeatedPassword.trim();
    }

    setMessageAs = (message,messageType) => {
        this.setState({
            message : message,
            messageType : messageType,
            isOpenMessage : true,
        })
    }

    isRegistrationSuccessfull = () => {
        const {messageType} = this.state;
        return messageType === "SUCCESS";
    }

    goToLoginPage = () => {
        setTimeout((() => {
            this.props.history.push("/login");
        }),3000)
    }

    componentDidMount() {
        this.setCurrentDateAsMaxValueForBirthDateInput();
    }

    setCurrentDateAsMaxValueForBirthDateInput = () => {
        this.setState({
            currentDate : new Date().toISOString().split("T")[0]
        })
    }

    closeMessageBox = () =>{
        this.setState({
            isOpenMessage : false

        })
    }
    handleUserTypeChange = (e) => {
        this.setState({
            userType : e.target.value
        })
    }

    handleGradeChange = (e) => {
        this.setState({
            grade : e.target.value
        })
    }

    render() {
        return (
            <Card className={"container w-50 mt-5 text-black bg-light text-center"}>
                <Card.Header>
                    <h4>Sign Up</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={(e)=> this.sendRegisterForm(e)}>
                        <Form.Group>
                            <Form.Label>What type of user do you want to register in our system ?</Form.Label>
                            <InputGroup>
                                <Form.Control as="select" required
                                              value={this.state.userType}
                                              onChange={(e) => this.handleUserTypeChange(e)}>
                                    <option value=""> - </option>
                            
                                    <option value="PARTICIPANT">PARTICIPANT</option>
                                    <option value="ORGANIZATOR">ORGANIZATOR</option>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        <div className={"row"}>
                            <div className={"col"}>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        required id="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                            <div className={"col"}>
                                <Form.Group>
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last name"
                                        required id="surname"
                                        value={this.state.surname}
                                        name="surname"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                        </div>

                        <div className={"row"}>
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="User Name"
                                        required id="username"
                                        value={this.state.username}
                                        name="username"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="mail"
                                        placeholder="Email"
                                        id="mail"
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                           
                        </div>
                        <div className="row">
                        <div className="col">
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required id="password"
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Re-enter your password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required id="repeatedPassword"
                                        value={this.state.repeatedPassword} name="repeatedPassword" onChange={this.updateInput} />
                                </Form.Group>
                            </div>
  
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>School ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="School ID"
                                        required id="schoolId"
                                        min="0"
                                        value={this.state.schoolId}
                                        name="schoolId"
                                        onChange={this.updateInput} />
                                </Form.Group>
                            </div>
                            <div className="col">
                               <Form.Group>
                                    <Form.Label>Grade</Form.Label>
                                    <InputGroup>
                                        <Form.Control as="select" required
                                                    value={this.state.grade}
                                                    onChange={(e) => this.handleGradeChange(e)}>
                                            <option value=""> - </option>
                                            <option value="9">9th Grade</option>
                                            <option value="10">10th Grade</option>
                                            <option value="11">11th Grade</option>
                                            <option value="12">12th Grade</option>
                                        </Form.Control>
                                    </InputGroup>
                               </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            {/* <div className="col-6">
                                <Form.Group>
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control type="date"
                                                  placeholder="Birth Date"
                                                  required id="birthDate"
                                                  value={this.state.birthDate}
                                                  max ={this.state.currentDate}
                                                  name="birthDate"
                                                  onChange={this.updateInput} />
                                </Form.Group>
                            </div> */}
                            <div className="col">
                                <Form.Group>
                                    <Form.Label>Cell Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="xxx-xxx-xxxx"
                                        required id="phone"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        value={this.state.phone}
                                        name="phone"
                                        onChange={this.updateInput} />
                                    <small>Format: 123-456-7890</small>
                                </Form.Group>
                            </div>
                             
                             
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
                {this.state.isOpenMessage ? <CustomizedSnackbar
                    vertical={"bottom"}
                    open = {this.state.isOpenMessage}
                    handleClose = {this.closeMessageBox}
                    horizontal={"center"}
                    message={this.state.message}
                    messageType={this.state.messageType}/> : null }
            </Card>
        );
    }
}

export default withRouter(RegisterForm);