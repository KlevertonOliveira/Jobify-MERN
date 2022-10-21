import { ChangeEvent, FormEvent, useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow, Logo } from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

export function Register() {

  const [values, setValues] = useState(initialState);
  const [showAlert, setShowAlert] = useState(false);

  function handleChange(e: ChangeEvent) {
    console.log(e.target);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(e.target);
  }

  function toggleMember() {
    setValues({ ...values, isMember: !values.isMember });
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert type='success' message='Message goes here' />}
        {/* Name input */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            handleChange={handleChange}
            labelText='Name'
            value={values.name}
          />
        )}
        {/* Email input */}
        <FormRow
          type='email'
          name='email'
          handleChange={handleChange}
          labelText='Email'
          value={values.email}
        />
        {/* Password input */}
        <FormRow
          type='password'
          name='password'
          handleChange={handleChange}
          labelText='Password'
          value={values.password}
        />
        <button type='submit' className='btn btn-block'>submit</button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Log in'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}