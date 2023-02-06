import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from "axios";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function QrCode(props) {
    const [open, setOpen] = React.useState(true);
    const [loading,setLoading] = React.useState(true);
    const [qrCode, setQrCode] = React.useState('');
    const history = useHistory();

    const goToEventsPage = () =>{
        history.push(`/events`);
        props.handleClose();
    }

    const goToMyEventsPage = () =>{
        const participantUsername = localStorage.getItem('username');
        history.push(`/myEvents/${participantUsername}`);
        props.handleClose();
    }

    useEffect(() => {
        getQrCode();

    },[])

    const getQrCode = async () => {
            const response = await axios.post(`/sendQrCodeOf/${props.participantUsername}`,
                props.event, {
                    headers : {
                        'Authorization' : "Bearer " + localStorage.getItem("jwtToken")
                    }
                }).catch(err => {
                history.push("/notFound404");
            })
        setQrCode(response.data);
        setLoading(false);
    }

    return (
        <div>
            <Dialog className={"bg-primary shadow-1-strong"}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={goToMyEventsPage}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                
                {/* <DialogTitle className={"text-center"} id="alert-dialog-slide-title">{"Join the event successfully!"}
                </DialogTitle> */}
                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <p>This is your ticket for the event.  The QR code and the event info has been sent to your e-mail account.</p>
                        <div className={"text-center"}>
                            {loading ? <Spinner animation="border" role="status"/> :
                                        <img alt='Embedded Image' src = {`data:image/png;base64,${qrCode}`}/>
                            }
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={goToEventsPage} className={"btn btn-primary "}>
                       Ok
                    </button>
                </DialogActions> */}
                <MDBCard className="p-3 mb-2 bg-warning bg-gradient text-dark rounded-5" >
                    <MDBRow className='g-0 align-items-center'>
                        <MDBCol md='4'>
                        <MDBCardImage src={`${process.env.PUBLIC_URL}/assets/event/baseball.jpeg`}  alt='...' fluid />
                        <MDBCardImage src={`data:image/png;base64,${qrCode}`}  alt='...' fluid />

        
                        {/* <div>
                            {loading ? <Spinner animation="border" role="status"/> :
                                        <img alt='Embedded Image' src = {`data:image/png;base64,${qrCode}`}/>
                            }
                        </div> */}
                        </MDBCol>
                        <MDBCol md='8'>
                        <MDBCardBody>
                            <MDBCardTitle>Baseball Game Ticket</MDBCardTitle>
                            <MDBCardText>
                            This is your ticket for the event.  The ticket QR code and the event info has been sent to your e-mail account.
                            </MDBCardText>
                            <MDBCardText>
                            <small className='text-muted'>WHEN: 09/11/2023</small>
                            </MDBCardText>
                            <MDBCardText>
                            <small className='text-muted'>WHERE: Baseball field</small>
                            </MDBCardText>
                            <MDBCardText>
                            <button onClick={goToMyEventsPage} className={"btn btn-primary "}>
                                OK
                                </button>
                            </MDBCardText>
                
                        </MDBCardBody>
                       
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </Dialog>
        </div>

    );
}