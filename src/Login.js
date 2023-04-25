import * as React from "react";
import { Button, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RhizomeLogo from "./img/rhizome-logo-big.png"
import {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth
} from "firebase/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        alignItems: "center",
        padding: theme.spacing(2, 8)
    },
    logo: {
        height: 150,
        width: 150,
        margin: theme.spacing(0, 3)
    },
    popup: {
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: theme.spacing(3)
    }
  }));

export default function Login({firebaseApp, setOauthToken, setUser}) {
    const classesBase = useStyles();
    const logInWithGoogle = () => {
        const googleAuthProvider= new GoogleAuthProvider();
        googleAuthProvider.addScope('https://www.googleapis.com/auth/spreadsheets');
        signInWithPopup(getAuth(firebaseApp), googleAuthProvider).then((result) => {
            setOauthToken(result._tokenResponse.oauthAccessToken)
            setUser(result.user);
        });
    }

    return <div className={classesBase.root}>
        <Paper className={classesBase.popup}>
            <img src={RhizomeLogo} className={classesBase.logo} alt="Rhizome Logo"/>
            <Typography variant="h5">Timesheet Manager</Typography>
            <Button
                className={classesBase.loginButton}
                color="primary"
                variant="contained"
                onClick={() => logInWithGoogle()}>Log in with Google
            </Button>  
        </Paper>
          
    </div>
}
