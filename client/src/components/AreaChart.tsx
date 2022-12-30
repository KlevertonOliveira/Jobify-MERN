import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
} from 'recharts';
import { MonthlyApplications } from '../types/Stats';

interface AreaChartProps {
  data: MonthlyApplications[];
}

export default function AreaChart({ data }: AreaChartProps) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <RechartsAreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='total' stroke='#2cb1bc' fill='#bef8fd' />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
