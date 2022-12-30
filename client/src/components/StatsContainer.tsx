import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import { Stats, StatItem as IStatItem } from '../types/Stats';
import StatItem from './StatItem';

interface StatsContainerProps {
  stats: Stats;
}

export default function StatsContainer({ stats }: StatsContainerProps) {
  const statsItems: IStatItem[] = [
    {
      title: 'pending applications',
      total: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      total: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      total: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {statsItems.map((item, index) => (
        <StatItem key={index} item={item} />
      ))}
    </Wrapper>
  );
}
