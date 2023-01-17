import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import GetUserSpots from './components/Spots/GetUserSpots/UserSpots';
import SearchSpots from './components/Spots/SearchSpots/SearchSpots';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [spotCount, setSpotCount] = useState('')
  const spots = useSelector(state => Object.values(state?.spot?.allSpots))


  useEffect(()=>{
    if(spots) setSpotCount(spots.length)
  },[])

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
        <Route path='/user/:userId' exact={true}>
          <User />
          <Footer />
        </Route>
        <Route path='/' exact={true} >
          <SplashPage />
          <Footer />
        </Route>
        <Route path='/userSpots' exact={true}>
          <GetUserSpots />
          <Footer />
        </Route>
        <Route path='/spots' exact={true}>
          <GetAllSpots />
          <Footer />
        </Route>
        <Route path='/spots/:spotId' exact={true}>
          <GetASpot spotCount={spotCount}/>
          <Footer />
        </Route>
        <Route path='/search' exact={true}>
            <SearchSpots />
            <Footer />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
