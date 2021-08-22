import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // checking if login or not
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
    {init ? <AppRouter isLoggedIn={ isLoggedIn } /> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Lwitter </footer>
    </>
  );
}

export default App;
