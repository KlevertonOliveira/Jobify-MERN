import { FormEvent, useState } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Alert, FormRow } from '../../components';
import { useAppContext } from '../../contexts/appContext';

export default function Profile() {
  const { state: { user, showAlert, isLoading }, displayAlert, updateUser } = useAppContext();

  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !name || !lastName || !location) {
      displayAlert({
        type: 'error',
        message: 'Please, provide all values'
      });
      return;
    }

    updateUser({ name, email, lastName, location });
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name!}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText='last name'
            name="lastName"
            value={lastName!}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email!}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location!}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button
            className='btn btn-block'
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Please, wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}