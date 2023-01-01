export enum JobTypeOptions {
  fullTime = 'full-time',
  partTime = 'part-time',
  remote = 'remote',
  internship = 'internship',
}

export enum JobStatusOptions {
  pending = 'pending',
  interview = 'interview',
  declined = 'declined',
}

export enum JobSortOptions {
  latest = 'latest',
  oldest = 'oldest',
  aToZ = 'a-z',
  zToA = 'z-a',
}

export type Job = {
  _id?: string;
  location: string;
  position: string;
  company: string;
  type: JobTypeOptions;
  status: JobStatusOptions;
  createdAt?: string;
};

export type JobsData = {
  jobs: Job[];
  totalJobs: number;
};
