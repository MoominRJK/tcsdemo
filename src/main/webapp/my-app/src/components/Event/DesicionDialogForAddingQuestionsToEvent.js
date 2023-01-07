import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DesicionDialogForAddingQuestionsToEvent(props) {
    const [open, setOpen] = React.useState(true);
    const history = useHistory();
    const goToEventPage = () =>{
        history.push(`/event/${props.eventName}`);
    }

    const goToQuestionAdditionPage = () =>{
        history.push(`/event/${props.eventName}/addQuestion`);
    }


    return (
        <div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={goToEventPage}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"About the Event Survey and Event-Specific Questions"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <strong>{props.eventName} </strong>event has occurred. for this event
                        Do you want to create questions that participants have to answer? ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={goToEventPage} color="primary">
                       No
                    </Button>
                    <Button onClick={goToQuestionAdditionPage} color="primary">
                       Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}