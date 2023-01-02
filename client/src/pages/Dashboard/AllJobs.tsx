import { useState } from 'react';
import { JobsContainer, SearchContainer } from '../../components';
import { JobSortOptions } from '../../types/Job';
import {
  jobStatus,
  jobTypes,
  SearchFormValues,
} from '../../types/SearchFormValues';

export const searchFormInitialState: SearchFormValues = {
  position: '',
  location: '',
  status: jobStatus.all,
  type: jobTypes.all,
  sort: JobSortOptions.latest,
};

export default function AllJobs() {
  const [searchFormValues, setSearchFormValues] = useState<SearchFormValues>(
    searchFormInitialState
  );

  function resetSearchFormFilters() {
    setSearchFormValues(searchFormInitialState);
  }

  return (
    <>
      <SearchContainer
        searchFormValues={searchFormValues}
        onChangeSearchFormValues={setSearchFormValues}
        resetSearchFormFilters={resetSearchFormFilters}
      />
      <JobsContainer searchFormValues={searchFormValues} />
    </>
  );
}
