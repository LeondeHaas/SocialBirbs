import "./Styles/App.css";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/AuthDetails";
import { auth, db, GoogleAuthProvider } from "./config/firebase";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
// import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <h1>Welcome to SocialBirbs!</h1>
        <br></br>
        <SignIn />
        <button className="google-sign-in">Sign in using Google</button>
        <br></br>
        <SignUp />
        <br></br>
        <AuthDetails />
      </div>
    </div>
  );

  // useEffect(() => {
  //   return onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //       console.log("wel user");
  //     } else {
  //       console.log("geen user");
  //     }
  //   });
  // }, []);
}

export default App;
