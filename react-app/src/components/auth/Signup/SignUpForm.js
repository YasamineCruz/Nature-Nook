import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import logo from '../../../assets/logo/logo-no-background.png'
import eye from '../../../assets/logo/eye.png'
import uneye from '../../../assets/logo/uneye.png'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    let validationErrors = [];
    if(password !== repeatPassword) validationErrors.push('Passwords do not match')
    if(!username || username.length < 3 || username.length > 20) validationErrors.push('Username must be between 3 and 20 characters')
    if(!firstName || firstName.length < 2 || firstName.length > 20) validationErrors.push('First name must be between 2 and 20 characters')
    if(!lastName || lastName.length < 2 || lastName.length > 20) validationErrors.push('Last name must be between 2 and 20 characters')
    if(!password || password.length < 6) validationErrors.push('Password must be atleast 6 characters long')
    if(!email || !email.includes('@') || !email.includes('.') || email[0] === '.' || email[-1] === '.' || email.split('.').includes('')) validationErrors.push('Invalid email entered')
    setErrors(validationErrors)
  },[password, repeatPassword, username, firstName, lastName, email])



  const onSignUp = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (password === repeatPassword && errors.length < 1) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      if (data) {
        setErrors([data[0].split(':')[1]])
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
          {errors && submitted && (
          <div>
             {errors.map((error, ind) => (
               <div className='signup-error' key={ind}>{error}</div>
             ))}
          </div>
          )}
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
          type={passwordType}
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Create a password'
        ></input>
      </div>
      <div>
        <input
          className='sign-input'
          type={passwordType}
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='Reenter password'
        ></input>
      </div>
      <div className='view-me'>
        <label className='view-pass'>View password</label>
        <img
          className='view'
          onClick={()=> setChecked(!checked)}
          src={checked ? eye : uneye}
          alt=''
          />
      </div>
      <button className='sign-up-button2' type='submit'>Agree and join NatureNook</button>
      <div className={errors.length >= 1 ? 'switch-margin' : 'switch-login'}>
          Already a NatureNooker?
          <Link className='sign-up-link' to='/login' exact='true'> Log in!</Link>
        </div>
    </form>
  );
};

export default SignUpForm;
