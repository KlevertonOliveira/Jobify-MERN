import { Job as IJob } from '../types/Job';
import { format } from 'date-fns';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { useAppContext } from '../contexts/appContext';
import Wrapper from '../assets/wrappers/Job';
import { Link } from 'react-router-dom';
import JobInfo from './JobInfo';

interface JobProps {
  job: IJob;
}

export default function Job({ job }: JobProps) {
  const { deleteJob } = useAppContext();

  const { company, createdAt, _id, status, position, location, type } = job;

  const date = format(new Date(createdAt), 'MMM do, yyyy');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={type} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link className='btn edit-btn' to={`/edit-job/${_id}`}>
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}
