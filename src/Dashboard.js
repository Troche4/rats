import * as React from "react";
import { Button, TextField, CircularProgress, Dialog, Paper } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Header from "./Header";
import TableView from "./TableView";
import AddHoursForm from "./AddHoursForm";

const useStyles = makeStyles((theme) => ({
    linkSheetForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(3),
        gap: theme.spacing(2)
    }
  }));

export default function Dashboard({firebaseApp, user, setUser, oauthAccessToken}) {
    const classesBase = useStyles();
    const [sheetData, setSheetData] = React.useState(null);
    const [sheetLink, setSheetLink] = React.useState(null);
    const [addHoursFormOpen, setAddHoursFormOpen] = React.useState(false);

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
        if (id?.length > 0) {
            localStorage.setItem(`${user.email}-sheetId`, id);
        }
        fetchSheetData();
    }

    React.useEffect(() => {
        fetchSheetData();
    }, []);

    return <React.Fragment>
        <Header 
            user={user} 
            firebaseApp={firebaseApp} 
            setUser={setUser} 
        />
        
        {sheetData?.values?.length > 0 ? <TableView sheetData={sheetData.values} /> : <CircularProgress color="primary" />}

        <Button
            variant="contained"
            color="primary"
            onClick={() => setAddHoursFormOpen(true)}
        >
            Add Hours
        </Button>

        <div className={classesBase.linkSheetForm}>
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
                variant="outlined"
                color="default"
                onClick={() => updateSheetId()}
            >
                Import
            </Button>
        </div>
        
        <Dialog
            open={addHoursFormOpen}
            onClose={() => setAddHoursFormOpen(false)}
        >
            <AddHoursForm 
                onSubmit={(task, date, startTime, endTime, description) => {
                    let newRow = [[task, date, startTime, endTime, description]];
                    let newRowIndex = sheetData.values.length + 1;
                    let range = `Sheet1!${newRowIndex}:${newRowIndex}`
                    let id = localStorage.getItem(`${user.email}-sheetId`);
                    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}?valueInputOption=RAW`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${oauthAccessToken}`
                        },
                        body: JSON.stringify({
                            range: range,
                            values: newRow
                        })
                    })
                    .then(() => {
                        fetchSheetData();
                        setAddHoursFormOpen(false);
                    })
                }}
            />
        </Dialog>    
    </React.Fragment>
}
