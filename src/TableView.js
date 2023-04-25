import { Table, TableContainer, TableHead, TableRow, IconButton, TableCell, TableBody, Paper, FormHelperText, Dialog } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import AddHoursForm from './AddHoursForm';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "80%",
      margin: theme.spacing(2, 0)
    },
    headerCell: {
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        fontWeight: 700
    },
    editAndDelete: {
        fontSize: "1.5em",
        padding: theme.spacing(1)
    }
  }));

export default function TableView({sheetData, handleUpdate}){
    const [editFormOpen, setEditFormOpen] = React.useState(false);
    const [editingIndex, setEditingIndex] = React.useState(null);

    const classesBase = useStyles();
    let rows = sheetData?.slice(Math.max(sheetData.length - 20, 1));
    const truncated = rows.length + 1 < sheetData.length;

    return <React.Fragment>
        {truncated && <FormHelperText>Showing the 20 most recent results</FormHelperText>}
            <TableContainer className={classesBase.root} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow key='header'>
                            {sheetData?.[0]?.map(cell => <TableCell key={`header ${cell}`} align="center" className={classesBase.headerCell}>{cell}</TableCell>)}
                            <TableCell className={classesBase.headerCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row, index) => {
                            return <TableRow key={`row ${index}`}>
                                {row?.map(cell => <TableCell key={`body ${index} ${cell}`} align="center">{cell}</TableCell>)}
                                <TableCell>
                                    <IconButton onClick={() => {
                                        setEditingIndex(index + 1);
                                        setEditFormOpen(true);
                                    }}>
                                        <EditIcon className={classesBase.editAndDelete} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
        </TableContainer>

        <Dialog
            open={editFormOpen}
            onClose={() => setEditFormOpen(false)}
        >
            <AddHoursForm 
                title={"Edit Row"}
                handleClose={() => setEditFormOpen(false)}
                onSubmit={(task, date, startTime, endTime, duration, description) => {
                    handleUpdate(task, date, startTime, endTime, duration, description, editingIndex);
                    setEditFormOpen(false);
                }}
            />
        </Dialog>
    </React.Fragment>
}
