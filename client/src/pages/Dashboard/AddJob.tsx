import { ChangeEvent, FormEvent, useState } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Alert, FormRow } from '../../components';
import FormRowSelect from '../../components/FormRowSelect';
import { useAppContext } from '../../contexts/appContext';
import { Job, JobStatusOptions, JobTypeOptions } from '../../types/Job';

const initialState: Job = {
  position: '',
  company: '',
  location: '',
  type: JobTypeOptions.fullTime,
  status: JobStatusOptions.pending,
};

export default function AddJob() {
  const {
    state: { isLoading, showAlert },
    displayAlert,
    createJob,
  } = useAppContext();

  const [jobValues, setJobValues] = useState<Job>(initialState);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { position, company, location } = jobValues;

    if (!position || !company || !location) {
      displayAlert({ type: 'error', message: 'Please, provide all values' });
      return;
    }

    createJob(jobValues);
    clearValues();
  }

  function clearValues() {
    setJobValues(initialState);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setJobValues({ ...jobValues, [e.target.name]: e.target.value });
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Add Job</h3>
        {showAlert && <Alert />}

        {/* position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={jobValues.position}
            handleChange={handleChange}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={jobValues.company}
            handleChange={handleChange}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='location'
            name='location'
            value={jobValues.location}
            handleChange={handleChange}
          />
          {/* type */}
          <FormRowSelect
            name='type'
            value={jobValues.type}
            handleChange={handleChange}
            optionsList={Object.values(JobTypeOptions)}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            value={jobValues.status}
            handleChange={handleChange}
            optionsList={Object.values(JobStatusOptions)}
          />
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              type='button'
              disabled={isLoading}
              onClick={clearValues}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
