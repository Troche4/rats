import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
      maxWidth: "80%"
    },
    headerCell: {
        backgroundColor: "#B3B3B3",
    }
  });

export default function TableView({sheetData}){
    const classesBase = useStyles();
    let rows = sheetData?.slice(1);
    return <TableContainer className={classesBase.root} component={Paper}>
        <Table>
            <TableHead>
                <TableRow key='header'>
                    {sheetData?.[0]?.map(cell => <TableCell align="center" className={classesBase.headerCell}>{cell}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows?.map((row, index) => {
                    return <TableRow key={`row ${index}`}>
                        {row?.map(cell => <TableCell align="center">{cell}</TableCell>)}
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </TableContainer>
}
