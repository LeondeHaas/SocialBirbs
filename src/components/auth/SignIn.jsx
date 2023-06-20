import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowPrivacyPopup(true); // Show the privacy popup after sign in attempt
  };

  const handlePrivacyAgreement = (agreed) => {
    if (agreed) {
      // Create account and log in
      // ...
      // Code to create account and log in goes here
    } else {
      // Reset the form
      setEmail("");
      setPassword("");
    }
    setShowPrivacyPopup(false); // Hide the privacy popup
  };

  return (
    <div className="sign-in-container">
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

      {showPrivacyPopup && (
        <div className="privacy-popup">
          <h2>Terms of Privacy</h2>
          {/* Privacy terms content goes here */}
          <button onClick={() => handlePrivacyAgreement(true)}>Agree</button>
          <button onClick={() => handlePrivacyAgreement(false)}>
            Disagree
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
