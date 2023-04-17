import * as React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import TableView from "./TableView";
import {
    signOut,
    getAuth
} from "firebase/auth";

export default function Dashboard({firebaseApp, user, setUser, oauthAccessToken}) {
    const [sheetId, setSheetId] = React.useState(null)
    const [hasLinkedSheet, setHasLinkedSheet] = React.useState(false);
    const [sheetData, setSheetData] = React.useState(null);
    

    const updateSheetId = (sheetLink) => {
        let id = sheetLink.split("/")[5];
        if (id?.length > 0) {
            setSheetId(id);
            setHasLinkedSheet(true);
            localStorage.setItem(`${user.email}-sheetId`, id);
        }
    }

    React.useEffect(() => {
        let id = localStorage.getItem(`${user.email}-sheetId`);
        if (id?.length > 0) {
            setSheetId(id);
            setHasLinkedSheet(true);
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sheet1?alt=json`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${oauthAccessToken}`
                }
            })
            .then((response) => response.json())
            .then((json) => {
                setSheetData(json)
            })
        }
        else {
            setHasLinkedSheet(false);
        }
    }, []);

    return <React.Fragment>
        <Typography variant="h3">Dashboard</Typography>
        <div>Welcome, {user.displayName} ({user.email})</div>
        {sheetData && <TableView sheetData={sheetData.values} />}
        <div>Update the timesheet associated with your account:</div> 
        <TextField 
            helperText="Copy and paste your google sheet link here:"
            placeholder="https://docs.google.com/spreadsheets/d/1JQ7xawhD7H27WasdfGxoEbSU-Y7osN3-F7hw/edit#gid=0"
            onChange={(evt) => {
                updateSheetId(evt.target.value)
            }}
        />
        <Button 
            variant="contained"
            onClick={() => {
                signOut(getAuth(firebaseApp))
                setUser(null);
            }}>Logout</Button>
    </React.Fragment>
}
