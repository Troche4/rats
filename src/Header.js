import * as React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signOut, getAuth } from "firebase/auth";

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

export default function Header({user, firebaseApp, setUser}) {
    const classesBase = useStyles();
    return <div className={classesBase.header}>
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
}