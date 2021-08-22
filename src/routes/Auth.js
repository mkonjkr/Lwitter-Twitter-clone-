import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  

  const onChange = (e) => {
    // get value from input form
    const {target: {name, value}} = e;

    if(name==="email") {
        setEmail(value);
    } else if (name === "password") {
        setPassword(value);
    }
  };

  //preventDF for form
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        let data;
      if (newAccount) {
        //create account
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // get previous value of new account and return opposite value
  const toggleAccount = () => setNewAccount((prev) =>!prev);
  const onSocialClick = async (e) => {
    const {
      target: {name},
    } = e;
    
    let provider;

    if(name==="google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    else if(name==="github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}      
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}</span>
      <div>
        <button onClick ={onSocialClick} name="google">Continue with Google</button>
        <button onClick ={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
