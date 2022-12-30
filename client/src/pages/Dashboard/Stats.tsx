import { useEffect, useState } from 'react';
import { ChartsContainer, Loading, StatsContainer } from '../../components';
import { useAppContext } from '../../contexts/appContext';
import { DefaultStats } from '../../types/Stats';

const initialState: DefaultStats = {
  stats: {
    pending: 0,
    interview: 0,
    declined: 0,
  },
  monthlyApplications: [],
};

export default function Stats() {
  const {
    state: { isLoading },
    showStats,
  } = useAppContext();

  const [defaultStats, setDefaultStats] = useState(initialState);

  async function fetchStats() {
    try {
      const statsData = await showStats();
      setDefaultStats(statsData);
    } catch (error) {
      setDefaultStats(initialState);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer stats={defaultStats.stats} />
      {defaultStats.monthlyApplications.length > 0 && (
        <ChartsContainer data={defaultStats.monthlyApplications} />
      )}
    </>
  );
}
