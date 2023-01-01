import { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAppContext } from '../contexts/appContext';
import { JobsData } from '../types/Job';
import { SearchFormValues } from '../types/SearchFormValues';
import Job from './Job';
import Loading from './Loading';
interface JobsContainerProps {
  searchFormValues: SearchFormValues;
}

const initialState: JobsData = {
  jobs: [],
  totalJobs: 0,
};

export default function JobsContainer({
  searchFormValues,
}: JobsContainerProps) {
  const [jobsData, setJobsData] = useState(initialState);

  const {
    state: { isLoading },
    getJobs,
  } = useAppContext();

  async function fetchJobs() {
    try {
      const allJobsData = await getJobs(searchFormValues);
      setJobsData(allJobsData);
    } catch (error) {
      setJobsData(initialState);
    }
  }

  useEffect(() => {
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
      <h5>
        {jobsData.totalJobs} job{jobsData.totalJobs > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobsData.jobs.map((job) => {
          return <Job key={job._id} job={job} />;
        })}
      </div>
    </Wrapper>
  );
}
