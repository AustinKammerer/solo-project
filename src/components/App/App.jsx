import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ParkFinder from "../ParkFinder/ParkFinder";
import ParkInfo from "../ParkInfo/ParkInfo";
import TripPlanner from "../TripPlanner/TripPlanner";
import JournalForm from "../JournalForm/JournalForm";
import EditEntry from "../EditEntry/EditEntry";
import CurrentTrip from "../CurrentTrip/CurrentTrip";
import TripHistory from "../TripHistory/TripHistory";
import GetStarted from "../GetStarted/GetStarted";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {user.id && <Nav />}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/placeholder"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* Get Started */}
          <ProtectedRoute
            // logged in shows GetStarted else shows LoginPage
            exact
            path="/start"
          >
            <GetStarted />
          </ProtectedRoute>

          {/* TripPlanner */}
          <ProtectedRoute
            // logged in shows TripPlanner else shows LoginPage
            exact
            path="/planner"
          >
            <TripPlanner />
          </ProtectedRoute>

          {/* Current Trip */}
          <ProtectedRoute
            // logged in shows CurrentTrip else shows LoginPage
            exact
            path="/current"
          >
            <CurrentTrip />
          </ProtectedRoute>

          {/* Trip History */}
          <ProtectedRoute
            // logged in shows TripHistory else shows LoginPage
            exact
            path="/history"
          >
            <TripHistory />
          </ProtectedRoute>
          {/* <Route
            // logged in shows TripHistory else shows LoginPage
            exact
            path="/history"
          >
            <TripHistory />
          </Route> */}

          {/* Form for editing journal entry */}
          <ProtectedRoute
            // logged in shows EditEntry else shows LoginPage
            exact
            path="/journal/edit"
          >
            <EditEntry />
          </ProtectedRoute>

          {/* Form for adding journal entry */}
          <ProtectedRoute
            // logged in shows JournalForm else shows LoginPage
            exact
            path="/journal/new/:tripId"
          >
            <JournalForm />
          </ProtectedRoute>

          {/* Park Finder */}
          <Route exact path="/finder">
            <ParkFinder />
          </Route>

          {/* Park Info */}
          <Route exact path="/info/:parkCode">
            <ParkInfo />
          </Route>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LoginPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
