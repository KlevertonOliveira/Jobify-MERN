import { ChangeEvent, FormEvent, useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow, Logo } from '../components';
import { useAppContext } from '../contexts/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

export function Register() {

  const [values, setValues] = useState(initialState);
  const { state: { showAlert }, displayAlert, clearAlert } = useAppContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { email, password, isMember, name } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert({ type: 'error', message: 'Please, provide all values!' });
      return;
    }

    console.log(values);
  }

  function toggleMember() {
    setValues({ ...values, isMember: !values.isMember });
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
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