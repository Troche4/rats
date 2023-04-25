import React from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { initializeApp } from "firebase/app";
import { MuiThemeProvider, createTheme, makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2, 8)
  },
  backdrop: {
    height: "100vh",
    backgroundColor: "gray"
  }
}));

export default function App(){
  const [user, setUser] = React.useState();
  const [oauthToken, setOauthToken] = React.useState();
  const classesBase = useStyles();

  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(',')
    },
    palette: {
      primary: {
        main: "rgb(238, 150, 109)"
      },
      secondary: {
        main: "rgb(7, 26, 47)"
      }
    }
  })

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

  return <MuiThemeProvider theme={theme}>
    <CssBaseline>
      <div className={clsx(classesBase.root, !user && classesBase.backdrop)}>
        {user?.email ? 
          <Dashboard firebaseApp={app} user={user} setUser={setUser} oauthAccessToken={oauthToken} />
          :
          <Login firebaseApp={app} setOauthToken={setOauthToken} setUser={setUser}/>
        }
      </div> 
    </CssBaseline>
  </MuiThemeProvider>
};
