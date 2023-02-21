import * as React from "react";
import { Button, Typography } from "@mui/material";
import {
    signOut,
    getAuth
} from "firebase/auth";

export default function Dashboard({firebaseApp, user, setUser}) {
    return <React.Fragment>
        <Typography variant="h3">Dashboard</Typography>
        <div>Welcome, {user.displayName}</div>
        <Button 
            variant="contained"
            onClick={() => {
                signOut(getAuth(firebaseApp))
                setUser(null);
            }}>Logout</Button>
    </React.Fragment>
}
