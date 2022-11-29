import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import logo from '../../../assets/logo/logo-no-background.png'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='signup-form' onSubmit={onSignUp}>
      <div>
        <img className='signup-nature' src={logo} alt=''/>
        <div className='signup-extra-text'>
        Search, discover and book
        </div>
        <div className='signup-extra-text'>
        Everywhere you want to camp.
        </div>
        <br/>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='full-name-div'>
        <input
          className='sign-name'
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
          required={true}
          placeholder='First name'
        ></input>

        <input
          className='sign-name'
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
          required={true}
          placeholder='Last name'
        ></input>
      </div>
      <div>
        <input
          className='sign-input'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='Username'
        ></input>
      </div>
      <div>
        <input
          className='sign-input'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Email address'
        ></input>
      </div>
      <div>
        <input
          className='sign-input'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Create a password'
        ></input>
      </div>
      <div>
        <input
          className='sign-input'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='Reenter password'
        ></input>
      </div>
      <button className='sign-up-button2' type='submit'>Agree and join NatureNook</button>
    </form>
  );
};

export default SignUpForm;
