import * as React from "react";
import { Button, Typography } from "@mui/material";
import {
    signOut,
    getAuth
} from "firebase/auth";

export default function Dashboard({firebaseApp, user, setUser}) {
    console.log(user)
    return <React.Fragment>
        <Typography variant="h3">Dashboard</Typography>
        <div>Welcome, {user.displayName}</div>
        <Button onClick={() => {
            signOut(getAuth(firebaseApp))
            setUser(null);
        }}>Logout</Button>
    </React.Fragment>
}
