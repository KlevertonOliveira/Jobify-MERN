import { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAppContext } from '../contexts/appContext';
import { JobsData } from '../types/Job';
import { SearchFormValues } from '../types/SearchFormValues';
import Alert from './Alert';
import Job from './Job';
import Loading from './Loading';
import PageButtonContainer from './PageButtonContainer';
interface JobsContainerProps {
  searchFormValues: SearchFormValues;
}

const initialState: JobsData = {
  jobs: [],
  totalJobs: 0,
  numberOfPages: 1,
};

export default function JobsContainer({
  searchFormValues,
}: JobsContainerProps) {
  const [jobsData, setJobsData] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    state: { isLoading, showAlert },
    getJobs,
  } = useAppContext();

  async function fetchJobs() {
    try {
      const allJobsData = await getJobs(searchFormValues, currentPage);
      setJobsData(allJobsData);
    } catch (error) {
      setJobsData(initialState);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchJobs();
  }, [searchFormValues]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobsData.jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {jobsData.totalJobs} job{jobsData.totalJobs > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobsData.jobs.map((job) => {
          return <Job key={job._id} job={job} />;
        })}
      </div>
      {jobsData.numberOfPages > 1 && (
        <PageButtonContainer
          currentPage={currentPage}
          selectPage={setCurrentPage}
          numberOfPages={jobsData.numberOfPages}
        />
      )}
    </Wrapper>
  );
}
