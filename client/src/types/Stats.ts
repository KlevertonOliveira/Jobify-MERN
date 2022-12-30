import { ReactNode } from 'react';

export interface Stats {
  declined: number;
  interview: number;
  pending: number;
}

export interface MonthlyApplications {
  date: string;
  total: number;
}

export interface DefaultStats {
  stats: Stats;
  monthlyApplications: MonthlyApplications[];
}

export interface StatItem {
  title: string;
  total: number;
  icon: ReactNode;
  color: string;
  bcg: string;
}
