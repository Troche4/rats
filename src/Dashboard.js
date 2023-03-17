import * as React from "react";
import { Button, Typography } from "@mui/material";
import {
    signOut,
    getAuth
} from "firebase/auth";

export default function Dashboard({firebaseApp, user, setUser, oauthAccessToken}) {
    const SHEET_ID = '1JQ7xXzLhD7H27WReFSauo6u6GxoEbSU-Y7osN3-F7hw'; // TODO avoid hardcoded sheet IDs or request by name

    React.useEffect(() => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?includeGridData=true`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${oauthAccessToken}`
            }
        })
        .then((res) => console.log(res));
    }, []);

    return <React.Fragment>
        <Typography variant="h3">Dashboard</Typography>
        <div>Welcome, {user.displayName} ({user.email})</div>
        <Button 
            variant="contained"
            onClick={() => {
                signOut(getAuth(firebaseApp))
                setUser(null);
            }}>Logout</Button>
    </React.Fragment>
}
