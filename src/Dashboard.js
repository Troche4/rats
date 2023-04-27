import * as React from "react";
import { Button, TextField, CircularProgress, Dialog } from "@material-ui/core";
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
    },
    actionButtons: {
        display: "flex",
        gap: theme.spacing(2)
    }
  }));

export default function Dashboard({firebaseApp, user, setUser, oauthAccessToken}) {
    const classesBase = useStyles();
    const [sheetData, setSheetData] = React.useState(null);
    const [sheetLink, setSheetLink] = React.useState(null);
    const [addHoursFormOpen, setAddHoursFormOpen] = React.useState(false);

    const fetchSheetData = () => {
        let id = localStorage.getItem(`${user.email}-sheetId`);
        if (id?.length > 0) {
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${oauthAccessToken}`
                }
            })
            .then((response) => response.json())
            .then((json) => {
                let name = json.sheets.slice(-1).pop().properties.title;
                if (id?.length > 0 && name?.length > 0) {
                    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${name}?alt=json`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${oauthAccessToken}`
                        }
                    })
                    .then((response) => response.json())
                    .then((json) => {
                        setSheetData(json);
                        if (json !== null && !json.values) {
                            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${name}!1:1?valueInputOption=RAW`, {
                                method: "PUT",
                                headers: {
                                    Authorization: `Bearer ${oauthAccessToken}`
                                },
                                body: JSON.stringify({
                                    range: `${name}!1:1`,
                                    values: [["Task", "Date", "Start Time", "End Time", "Duration (hours)", "Description"]]
                                })
                            })
                            .then(() => {
                                fetchSheetData();
                            })
                        }
                    })
                }
                localStorage.setItem(`${user.email}-sheetName`, name);
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

    const handleUpdate = (task, date, startTime, endTime, duration, description, index) => {
            let newRow = [[task, date, startTime, endTime, duration, description]];
            let id = localStorage.getItem(`${user.email}-sheetId`);
            fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${oauthAccessToken}`
                }
            })
            .then((response) => response.json())
            .then((json) => {
                let name = json.sheets.slice(-1).pop().properties.title;
                let range = `${name}!${index+1}:${index+1}`;
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
            })
    }

    const submitSheet = () => {
        let id = localStorage.getItem(`${user.email}-sheetId`);
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}:batchUpdate`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${oauthAccessToken}`
            },
            body: JSON.stringify({
                  "requests": [
                    {
                      "addSheet": {
                        "properties": {
                        }
                    }
                    }
                  ],
                  "responseIncludeGridData": true
                })
        })
        .then((response) => response.json())
        .then(() => {
            setSheetData(null);
            fetchSheetData();
        })
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
        
        {sheetData?.values ? <React.Fragment>
            <TableView sheetData={sheetData.values} handleUpdate={handleUpdate}/>
            <div className={classesBase.actionButtons}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setAddHoursFormOpen(true)}
                >
                    Add Hours
                </Button>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={() => submitSheet()}
                >
                    Submit For Approval
                </Button>
            </div>
        </React.Fragment>
        :
            <CircularProgress color="secondary" />
        }

        <div className={classesBase.linkSheetForm}>
            <div>Update the timesheet associated with your account:</div> 
            <TextField 
                variant="outlined"
                fullWidth
                helperText="Copy and paste your google sheet link here above. The first row should have the following column names in it, starting from the top left: Task, Date, Start Time, End Time, Duration, Description."
                placeholder="Example: https://docs.google.com/spreadsheets/d/1JQ7xawhD7H27WasdfGxoEbSU-Y7osN3-F7hw/edit#gid=0"
                onChange={(evt) => {
                    setSheetLink(evt.target.value)
                }}
            />
            <Button
                variant="outlined"
                color="inherit"
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
                title="Add Hours"
                handleClose={() => setAddHoursFormOpen(false)}
                onSubmit={(task, date, startTime, endTime, duration, description) => {
                    handleUpdate(task, date, startTime, endTime, duration, description, sheetData?.values?.length);
                }}
            />
        </Dialog>    
    </React.Fragment>
}
