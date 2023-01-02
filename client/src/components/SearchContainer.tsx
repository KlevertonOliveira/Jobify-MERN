import { ChangeEvent, FormEvent } from 'react';
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

  const {
    state: { isLoading },
  } = useAppContext();

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (isLoading) return;

    onChangeSearchFormValues({
      ...searchFormValues,
      [e.target.name]: e.target.value,
    });
  }

  function clearFilters(e: FormEvent) {
    e.preventDefault();
    resetSearchFormFilters();
  }

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        {/* search */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={searchFormValues.position}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            value={searchFormValues.location}
            handleChange={handleChange}
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
            onClick={clearFilters}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
