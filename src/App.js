import React from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { initializeApp } from "firebase/app";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    paddingTop: "16px"
  }
}));

export default function App(){
  const [user, setUser] = React.useState();
  const [oauthToken, setOauthToken] = React.useState();
  const classesBase = useStyles();

  const firebaseConfig = {
    apiKey: "AIzaSyAsGgu2Z7NKopGcQohlZoRgoHf_cSCMKIo",
    authDomain: "rats-5ca71.firebaseapp.com",
    projectId: "rats-5ca71",
    storageBucket: "rats-5ca71.appspot.com",
    messagingSenderId: "206325077480",
    appId: "1:206325077480:web:81e882772360bf333e405d",
    measurementId: "G-0M4TQH1KWE"
  };
  const app = initializeApp(firebaseConfig);

  return <div className={classesBase.root}>
    {user?.email ? 
      <Dashboard firebaseApp={app} user={user} setUser={setUser} oauthAccessToken={oauthToken} />
      :
      <Login firebaseApp={app} setOauthToken={setOauthToken} setUser={setUser}/>
    }
  </div> 
};
