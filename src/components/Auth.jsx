import React from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut  } from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error(e);
    }
  };

  const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
      console.error(error);
        
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border-gray-solid"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border-gray-solid"
      />
      <br />
      <button className="border-gray-solid" onClick={signIn}>
        Login
      </button>

      <br />

      <button className="border-gray-solid" onClick={signInWithGoogle}>
        <img
          src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/fff4be3829cee39e477a518f55475f44"
          alt="Google Logo"
        />
      </button>
        <br />

       <button className="border-gray-solid" onClick={logOut}>
        Log Out
        </button> 
    </div>
  );
};

export default Auth;
