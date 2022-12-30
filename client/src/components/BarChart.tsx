import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
} from 'recharts';
import { MonthlyApplications } from '../types/Stats';

interface BarChartProps {
  data: MonthlyApplications[];
}

export default function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <RechartsBarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='total' fill='#2cb1bc' barSize={75} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
