import { JobSortOptions, JobStatusOptions, JobTypeOptions } from './Job';

export enum AllOption {
  all = 'all',
}

export const jobTypes = { ...AllOption, ...JobTypeOptions };
export const jobStatus = { ...AllOption, ...JobStatusOptions };

export type SearchFormValues = {
  position: string;
  location: string;
  status: keyof typeof jobStatus;
  type: keyof typeof jobTypes;
  sort: keyof typeof JobSortOptions;
};
