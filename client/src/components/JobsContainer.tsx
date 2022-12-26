import { useEffect } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAppContext } from '../contexts/appContext';
import Job from './Job';
import Loading from './Loading';

export default function JobsContainer() {
  const {
    state: { jobs, totalJobs, currentPage, isLoading },
    getJobs,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} job={job} />;
        })}
      </div>
    </Wrapper>
  );
}
