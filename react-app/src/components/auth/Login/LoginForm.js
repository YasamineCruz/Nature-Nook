import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css'
import eye from '../../../assets/logo/eye.png'
import uneye from '../../../assets/logo/uneye.png'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [checked, setChecked] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(()=> {
    if(checked) setPasswordType('text')
    else setPasswordType('password')
  }, [passwordType, checked])

  useEffect(()=>{
    let validationErrors = []
    if(!email) validationErrors.push('Email is required')
    if(!password) validationErrors.push('Password is required')
    setErrors(validationErrors)
  },[email, password])

  const onLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    let validationErrors = []
    if(errors.length < 1){
      const data = await dispatch(login(email, password));
      if (data) {
        validationErrors.push(data[0].split(':')[1])
        setErrors(validationErrors);
      }
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

  const handleSubmitDemoUser = (e) => {
    e.preventDefault()
    setErrors([])
    return dispatch(login('demo@aa.io', 'password'))
  } 


  return (
    <div id='page1' className='login-container'>
    <form className='login-form' onSubmit={onLogin}>
      <h1 className='login-lg-text'>Welcome back!</h1>
      <h3 className='login-sml-text'>Let's get you outside.</h3>
      {errors && submitted && (
      <div className='login-errors'>
        {errors.map((error, ind) => (
          <div className='login-error' key={ind}>{error}</div>
        ))}
      </div>
      )}
      <div className='demo-user-container' onClick={(e) => handleSubmitDemoUser(e)}>
        <i className="fas fa-user-circle fa-2x login-fa" />
        <div className='demo-user-text'>Demo User</div>
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
          type={passwordType}
          placeholder='Password...'
          value={password}
          onChange={updatePassword}
        />
      <div className='view-me'>
        <label className='view-pass'>View password</label>
        <img
          className='view'
          onClick={()=> setChecked(!checked)}
          src={checked ? eye : uneye}
          alt=''
          />
      </div>
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
