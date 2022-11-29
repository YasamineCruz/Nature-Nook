import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/Login/LoginForm';
import SignUpForm from './components/auth/Signup/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import User from './components/User/User';
import { authenticate } from './store/session';
import GetAllSpots from './components/Spots/GetAllSpots/GetAllSpots';
import GetASpot from './components/Spots/GetASpot/GetASpot';
import SplashPage from './components/splash';
import SignupUserModal from './components/auth/Signup';
import SignUpPage from './components/auth/Signup/SignupPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpPage />
          <SignupUserModal />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/spots' exact={true}>
          <GetAllSpots />
        </Route>
        <Route path='/spots/:spotId' exact={true}>
          <GetASpot />
        </Route>
        <Route></Route>
        <Route></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
