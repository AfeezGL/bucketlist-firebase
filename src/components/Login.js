import React from "react";
import db, { auth, provider } from "../firebase";
import googleIcon from "../../src/google.svg";

const Login = () => {
  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        db.collection("users")
          .doc(user.uid)
          .set({ uid: user.uid }, { merge: true });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <>
      <header>
        <h2>BucketList</h2>
      </header>
      <div className="login">
        <button onClick={login}>
          <img src={googleIcon} alt="Google icon" />
          <h4>LOGIN</h4>
        </button>
      </div>
    </>
  );
};

export default Login;
