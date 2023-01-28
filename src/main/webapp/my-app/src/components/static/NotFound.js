import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

function NotFound() {

    return(
        <Alert severity="error" className={"container mt-5"}>
            <AlertTitle>Error processing your request. Please contact administrator for helps.</AlertTitle>
            <strong>
                <a className={"nav-item"} href = "/">Click here</a> you can go to the home page.
            </strong>
        </Alert>
    );
}
export default NotFound;