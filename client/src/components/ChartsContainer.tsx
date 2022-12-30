import { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { MonthlyApplications } from '../types/Stats';
import AreaChart from './AreaChart';
import BarChart from './BarChart';

interface ChartsContainerProps {
  data: MonthlyApplications[];
}

type Chart = 'Area' | 'Bar';

export default function ChartsContainer({ data }: ChartsContainerProps) {
  const [chartType, setChartType] = useState<Chart>('Bar');

  function toggleChartType() {
    const newChartType: Chart = chartType === 'Bar' ? 'Area' : 'Bar';
    setChartType(newChartType);
  }

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={toggleChartType}>
        Display as {chartType === 'Bar' ? 'AreaChart' : 'BarChart'}
      </button>
      {chartType === 'Bar' ? (
        <BarChart data={data} />
      ) : (
        <AreaChart data={data} />
      )}
    </Wrapper>
  );
}
