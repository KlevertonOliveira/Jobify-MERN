import Wrapper from '../assets/wrappers/StatItem';
import { StatItem as IStatItem } from '../types/Stats';

interface StatItemProps {
  item: IStatItem;
}

export default function StatItem({ item }: StatItemProps) {
  const { title, total, icon, color, bcg } = item;

  return (
    <Wrapper color={color} background={bcg}>
      <header>
        <span className='count'>{total}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
}
