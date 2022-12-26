import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import Wrapper from '../assets/wrappers/JobInfo';

interface JobInfoProps {
  icon: ReactNode;
  text: string;
}

export default function JobInfo({ icon, text }: JobInfoProps) {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  );
}
