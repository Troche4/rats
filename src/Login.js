import * as React from "react";
import { Button, Typography } from "@mui/material";
import {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth
} from "firebase/auth";

export default function Login({firebaseApp, user, setUser}) {
    const logInWithGoogle = () => {
        const googleAuthProvider= new GoogleAuthProvider();
        signInWithPopup(getAuth(firebaseApp), googleAuthProvider).then((result) => {
            setUser(result.user);
        });
    }

    return <React.Fragment>
        <Typography variant="h4">Login</Typography>
        <Button
            variant="contained"
            onClick={() => logInWithGoogle()}>Log in with Google
        </Button>    
    </React.Fragment>
}
