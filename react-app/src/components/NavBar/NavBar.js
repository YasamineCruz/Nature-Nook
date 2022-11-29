
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateSpotModal from '../Spots/CreateSpotModal';
import logo from '../../assets/logo/logo-no-background.png'
import './NavBar.css'
import fav from '../../assets/logo/naturenook-favicon.png'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='navbar'>
      <div className='NatureNook-logo'>
        <NavLink to='/' exact={true}>
          <img className='navbar-logo' src={logo} alt=''/>
        </NavLink>
      </div>
      <div className='dropdown-and-icon-container' onMouseLeave={()=> setShowDropdown(false)}>
         <img src={fav} alt='' className='dropdown-fav' onMouseEnter={() => setShowDropdown(true)} />
        {showDropdown && (
          <div className='dropdown-wrapper' onMouseEnter={() => setShowDropdown(true)}  onMouseLeave={()=> setShowDropdown(false)}>
          {!sessionUser && (
            <div className='dropdown-link-wrapper' onMouseOver={() => setShowDropdown(true)}>
            <NavLink className='dropdown-link' onMouseOver={() => setShowDropdown(true)} to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>
          )}
          {!sessionUser && (
            <div className='dropdown-link-wrapper' onMouseOver={() => setShowDropdown(true)}>
            <NavLink className='dropdown-link' onMouseOver={() => setShowDropdown(true)} to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>
          )}
          {sessionUser && (
            <div className='dropdown-link-wrapper' onMouseOver={() => setShowDropdown(true)}>
            <NavLink className='dropdown-link' onMouseOver={() => setShowDropdown(true)} to='/spots' exact={true} activeClassName='active'>
              Spots
            </NavLink>
          </div>
            )}
          
          {sessionUser && (
            <div className='dropdown-link-wrapper' onMouseOver={() => setShowDropdown(true)}>
            <CreateSpotModal />
          </div>
          )}
          {sessionUser && (
              <div className='dropdown-link-wrapper' onMouseOver={() => setShowDropdown(true)}>
            <LogoutButton />
          </div> 
          )}
        </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
