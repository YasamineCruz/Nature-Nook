
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/Login/LogoutButton';
import CreateSpotModal from '../Spots/CreateSpotModal';
import logo from '../../assets/logo/logo-no-background.png'
import './NavBar.css'
import fav from '../../assets/logo/naturenook-favicon.png'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const [stop, setStop] = useState(false)

  return (
    <nav className='navbar'>
      <div className='NatureNook-logo'>
        <NavLink to='/' exact={true}>
          <img className='navbar-logo' src={logo} alt=''/>
        </NavLink>
      </div>
      {!sessionUser && (
        <div className='logged-out-nav'>
          <button className='log-in-button'>
            <NavLink className='logged-out-dropdown-link1'to='/login' exact={true} activeClassName='active'>
              Log in
            </NavLink>
          </button>
          <button className='sign-up-button'>
            <NavLink className='logged-out-dropdown-link2' to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </button>

        </div>
      )}
      {sessionUser && (
         <div className='dropdown-and-icon-container'>
         <img src={fav} alt='' className='dropdown-fav' onMouseEnter={() => setShowDropdown(true)} />
        {showDropdown && (
          <div className='dropdown-wrapper' onMouseEnter={() => setShowDropdown(true)}  onMouseLeave={(e)=> {if(stop === false) setShowDropdown(false)}}>
            <div className='dropdown-link-wrapper'>
            <NavLink className='dropdown-link' to='/spots' exact={true} activeClassName='active'>
              Spots
            </NavLink>
          </div>

          <div className='dropdown-link-wrapper'>
            <CreateSpotModal setStop={setStop} setShowDropdown={setShowDropdown}/>
          </div>

          <div className='dropdown-link-wrapper'>
            <LogoutButton/>
          </div> 

        </div>
        )}
      </div>
      )}
     
    </nav>
  );
}

export default NavBar;
