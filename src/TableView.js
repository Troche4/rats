import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@material-ui/core";
import React from "react";


export default function TableView({sheetData}){
    let rows = sheetData.slice(1);
    console.log(rows)
    return <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    {sheetData[0]?.map(cell => <TableCell align="center">{cell}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => {
                    <TableRow>
                        {row?.map(cell => <TableCell align="center">{cell}</TableCell>)}
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </TableContainer>
}
