import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

function NotFound() {

    return(
        <Alert severity="error" className={"container mt-5"}>
            <AlertTitle>Page Not Found!</AlertTitle>
            <strong>
                <a className={"nav-item"} href = "/login">Click here</a> you can go to the login page.
            </strong>
        </Alert>
    );
}
export default NotFound;