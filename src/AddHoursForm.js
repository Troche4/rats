import * as React from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
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
    submitButton:{ 
        marginTop: theme.spacing(1)
    }
  }));


export default function AddHoursForm({onSubmit}){
    const classesBase = useStyles();

    const [task, setTask] = React.useState("");
    const [date, setDate] = React.useState(new Date().toLocaleDateString("en-US"));
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const [description, setDescription] = React.useState("");

    return <Paper className={classesBase.formContainer}>
        <Typography className={classesBase.title} variant="h5">Add Hours</Typography>
        <TextField
            variant="outlined"
            margin="dense"
            helperText={"Task Name"}
            value={task}
            onChange={(evt) => setTask(evt.target.value)}
        />
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
            helperText={"Description"}
            multiline
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
        />
        <Button
            className={classesBase.submitButton}
            variant="contained"
            color="primary"
            onClick={() => onSubmit(task, date, startTime, endTime, description)}
        >
            Submit
        </Button>
    </Paper>
}