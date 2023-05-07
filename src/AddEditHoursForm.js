import * as React from "react";
import { Button, Paper, TextField, Typography, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(3),
        minWidth: 300
    },
    title: {
        marginBottom: theme.spacing(1)
    },
    footer:{ 
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: theme.spacing(1),
    },
    select: {
        minWidth: 205,
        margin: theme.spacing(1, 0)
    }
  }));


export default function AddEditHoursForm({title, onSubmit, handleClose, existingRow}){
    const classesBase = useStyles();
    const [task, setTask] = React.useState(existingRow?.[0] ?? "Organizer Meetings");
    const [date, setDate] = React.useState(existingRow?.[1] ?? new Date().toLocaleDateString("en-US"));
    const [startTime, setStartTime] = React.useState(existingRow?.[2] ?? " ");
    const [endTime, setEndTime] = React.useState(existingRow?.[3] ?? " ");
    const [duration, setDuration] = React.useState(existingRow?.[4] ?? " ");
    const [description, setDescription] = React.useState(existingRow?.[5] ?? " ");
    const [notes, setNotes] = React.useState(existingRow?.[6] ?? " ")

    return <Paper className={classesBase.formContainer}>
        <Typography className={classesBase.title} variant="h5">{title}</Typography>
        <FormControl variant="outlined" className={classesBase.select}>
            <InputLabel>Task</InputLabel>
            <Select
                value={task}
                onChange={(evt) => setTask(evt.target.value)}
                label="Task"
                margin="dense"
            >
                <MenuItem value="Organizer Meetings">Organizer Meetings</MenuItem>
                <MenuItem value="Chapter Meetings">Chapter Meetings</MenuItem>
                <MenuItem value="Outreach">Outreach</MenuItem>
                <MenuItem value="Interviews">Interviews</MenuItem>
                <MenuItem value="Communications">Communications</MenuItem>
                <MenuItem value="1 on 1 Meetings">1 on 1 Meetings</MenuItem> 
                <MenuItem value="Other">Other</MenuItem>
            </Select>
        </FormControl>
        <TextField
            variant="outlined"
            margin="dense"
            helperText={"Date"}
            value={date}
            onChange={(evt) => setDate(evt.target.value)}
        />
        <TextField
            variant="outlined"
            margin="dense"
            helperText={"Start Time"}
            value={startTime}
            onChange={(evt) => setStartTime(evt.target.value)}
        />
        <TextField
            variant="outlined"
            margin="dense"
            helperText={"End Time"}
            value={endTime}
            onChange={(evt) => setEndTime(evt.target.value)}
        />
        <TextField
            variant="outlined"
            margin="dense"
            helperText={"Duration (must be in hours)"}
            value={duration}
            onChange={(evt) => setDuration(evt.target.value)}
        />
        <TextField
            variant="outlined"
            margin="dense"
            helperText={"Description"}
            multiline
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
        />
        <TextField
            variant="outlined"
            margin="dense"
            helperText={"Notes (if applicable)"}
            multiline
            value={notes}
            onChange={(evt) => setNotes(evt.target.value)}
        />
        <div className={classesBase.footer}>
            <Button
                className={classesBase.submitButton}
                variant="outlined"
                onClick={() => handleClose()}
            >
                Cancel
            </Button>
            <Button
                className={classesBase.submitButton}
                variant="contained"
                color="primary"
                onClick={() => onSubmit(task, date, startTime, endTime, duration, description, notes)}
            >
                Save
            </Button>
        </div>
        
    </Paper>
}