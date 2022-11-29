import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css'
import NavBar from '../../NavBar/NavBar';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    let validationErrors = []
    const data = await dispatch(login(email, password));
    if (data) {
      validationErrors.push(data[0].split(':')[1])
      setErrors(validationErrors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }



  return (
    <div id='page1' className='login-container'>
    <form className='login-form' onSubmit={onLogin}>
      <h1 className='login-lg-text'>Welcome back!</h1>
      <h3 className='login-sml-text'>Let's get you outside.</h3>
      <div className='login-errors'>
        {errors.map((error, ind) => (
          <div className='login-error' key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-input-container'>
        <input
          className='login-input'
          name='email'
          type='text'
          placeholder='Email address...'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='login-input-container2'>
        <input
          className='login-input'
          name='password'
          type='password'
          placeholder='Password...'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button className='login-form-button' type='submit'>Log in</button>
        <div className='switch-signup'>
          Don't have a NatureNook?
          <Link className='sign-up-link' to='/sign-up' exact='true'> Sign up!</Link>
        </div>
    </form>
    </div>
  );
};

export default LoginForm;
