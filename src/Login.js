import * as React from "react";
import { Button, Typography } from "@material-ui/core";
import {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth
} from "firebase/auth";

export default function Login({firebaseApp, setOauthToken, setUser}) {
    const logInWithGoogle = () => {
        const googleAuthProvider= new GoogleAuthProvider();
        googleAuthProvider.addScope('https://www.googleapis.com/auth/spreadsheets');
        signInWithPopup(getAuth(firebaseApp), googleAuthProvider).then((result) => {
            setOauthToken(result._tokenResponse.oauthAccessToken)
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
