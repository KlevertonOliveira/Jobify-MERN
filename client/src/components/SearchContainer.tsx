import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppContext } from '../contexts/appContext';
import { JobSortOptions } from '../types/Job';
import {
  jobStatus,
  jobTypes,
  SearchFormValues,
} from '../types/SearchFormValues';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';

interface SearchContainerProps {
  searchFormValues: SearchFormValues;
  onChangeSearchFormValues: (searchFormValues: SearchFormValues) => void;
  resetSearchFormFilters: () => void;
}

export default function SearchContainer(props: SearchContainerProps) {
  const { searchFormValues, onChangeSearchFormValues, resetSearchFormFilters } =
    props;

  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');

  const {
    state: { isLoading },
  } = useAppContext();

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    onChangeSearchFormValues({
      ...searchFormValues,
      [e.target.name]: e.target.value,
    });
  }

  function clearFilters(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPosition('');
    setLocation('');
    resetSearchFormFilters();
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      onChangeSearchFormValues({
        ...searchFormValues,
        position,
        location,
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [position, location]);

  return (
    <Wrapper>
      <form className='form' onSubmit={clearFilters}>
        <h4>Search Form</h4>
        {/* search */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={(e) => {
              setPosition(e.target.value);
            }}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          {/* type */}
          <FormRowSelect
            name='type'
            value={searchFormValues.type}
            handleChange={handleChange}
            optionsList={Object.values(jobTypes)}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            value={searchFormValues.status}
            handleChange={handleChange}
            optionsList={Object.values(jobStatus)}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={searchFormValues.sort}
            handleChange={handleChange}
            optionsList={Object.values(JobSortOptions)}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            type='submit'
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
