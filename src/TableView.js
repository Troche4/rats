import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, FormHelperText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "80%",
      margin: theme.spacing(2, 0)
    },
    headerCell: {
        backgroundColor: "#B3B3B3",
    }
  }));

export default function TableView({sheetData}){
    const classesBase = useStyles();
    let rows = sheetData.slice(Math.max(sheetData.length - 20, 1));
    const truncated = rows.length + 1 < sheetData.length;

    return <React.Fragment>
        {truncated && <FormHelperText>Showing the 20 most recent results</FormHelperText>}
            <TableContainer className={classesBase.root} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow key='header'>
                            {sheetData?.[0]?.map(cell => <TableCell key={`header ${cell}`} align="center" className={classesBase.headerCell}>{cell}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row, index) => {
                            return <TableRow key={`row ${index}`}>
                                {row?.map(cell => <TableCell key={`body ${index} ${cell}`} align="center">{cell}</TableCell>)}
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
        </TableContainer>
    </React.Fragment>
}
