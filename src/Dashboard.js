import * as React from "react";
import { Button, TextField, Typography, CircularProgress } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TableView from "./TableView";
import {
    signOut,
    getAuth
} from "firebase/auth";

const useStyles = makeStyles((theme) => ({
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: theme.spacing(0, 3, 3, 3)
    },
    account: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: theme.spacing(2)
    }
  }));

export default function Dashboard({firebaseApp, user, setUser, oauthAccessToken}) {
    const classesBase = useStyles();
    const [sheetData, setSheetData] = React.useState(null);
    const [sheetLink, setSheetLink] = React.useState(null);

    const fetchSheetData= () => {
        let id = localStorage.getItem(`${user.email}-sheetId`);
        if (id?.length > 0) {
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
    }
    
    const updateSheetId = () => {
        let id = sheetLink.split("/")[5];
        console.log(id)
        if (id?.length > 0) {
            localStorage.setItem(`${user.email}-sheetId`, id);
        }
        fetchSheetData();
    }

    React.useEffect(() => {
        fetchSheetData();
    }, []);

    return <React.Fragment>
        <div className={classesBase.header}>
            <Typography variant="h3">Dashboard</Typography>
            <div className={classesBase.account}>
                <div>{user.displayName} ({user.email})</div>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        signOut(getAuth(firebaseApp))
                        setUser(null);
                    }}>
                        Logout
                </Button>
            </div>
        </div>
        
        {sheetData ? <TableView sheetData={sheetData.values} /> : <CircularProgress color="primary" />}
        <div>Update the timesheet associated with your account:</div> 
        <TextField 
            variant="outlined"
            helperText="Copy and paste your google sheet link here above."
            placeholder="https://docs.google.com/spreadsheets/d/1JQ7xawhD7H27WasdfGxoEbSU-Y7osN3-F7hw/edit#gid=0"
            onChange={(evt) => {
                setSheetLink(evt.target.value)
            }}
        />
        <Button 
            variant="contained"
            color="primary"
            onClick={() => updateSheetId()}
        >
                Import
            </Button>
        
    </React.Fragment>
}
