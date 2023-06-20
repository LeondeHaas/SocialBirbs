import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setShowPrivacyPopup(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePrivacyAgreement = (agreed) => {
    if (agreed) {
      // Perform any additional logic or actions before logging in
      setLoggedIn(true); // Simulating successful login
    } else {
      setEmail("");
      setPassword("");
    }
    setShowPrivacyPopup(false);
  };

  return (
    <div className="sign-in-container">
      {!loggedIn && (
        <form onSubmit={signIn}>
          <h1>LOG IN</h1>
          <input
            type="text"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log in</button>
        </form>
      )}

      {showPrivacyPopup && (
        <div className="privacy-popup">
          <h2>Terms of Privacy</h2>
          As user who is signing this contract agree with whatever I post will
          be on here until I delete it, I agree to the fact that eveything I say
          or do on this can be seen by other users. Further more do I agree that
          birds are fricking awesome and that I'll always treat them right.
          Lastly I agree to the fact that Iam resposible for my own behavior on
          this app and will take consecuenses if nessesary.
          <button onClick={() => handlePrivacyAgreement(true)}>Agree</button>
          <button onClick={() => handlePrivacyAgreement(false)}>
            Disagree
          </button>
        </div>
      )}

      {loggedIn && <p>You have successfully logged in.</p>}
    </div>
  );
};

export default SignIn;
