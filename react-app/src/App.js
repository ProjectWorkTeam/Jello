import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Board from "./components/Board/Board";
import BoardList from "./components/BoardList/BoardList";
import LandingPage from "./components/LandingPage/Landing";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
        <Route exact path="/login">
          <LoginFormPage />
        </Route>
        <Route exact path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/board/:boardid">
          <Board />
        </Route>
        <Route exact path="/home">
          <BoardList />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
