import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Alert, FormRow } from '../../components';
import FormRowSelect from '../../components/FormRowSelect';
import { useAppContext } from '../../contexts/appContext';
import { Job, JobStatusOptions, JobTypeOptions } from '../../types/Job';

const initialState: Job = {
  _id: '',
  createdAt: '',
  position: '',
  company: '',
  location: '',
  type: JobTypeOptions.fullTime,
  status: JobStatusOptions.pending,
};

export default function EditJob() {
  const {
    state: { isLoading, showAlert, jobs },
    displayAlert,
    editJob,
  } = useAppContext();

  const { jobId } = useParams();

  const [jobValues, setJobValues] = useState<Job>(initialState);

  function fetchJobValues() {
    const job = jobs.find((job) => job._id === jobId) ?? initialState;
    setJobValues(job);
  }

  function clearValues() {
    setJobValues(initialState);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { position, company, location, _id } = jobValues;

    if (!position || !company || !location) {
      displayAlert({ type: 'error', message: 'Please, provide all values' });
      return;
    }

    editJob(_id);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setJobValues({ ...jobValues, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    fetchJobValues();
  }, []);

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Edit Job</h3>
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
