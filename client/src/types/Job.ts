export enum JobTypeOptions {
  fullTime = "full-time",
  partTime = "part-time",
  remote = "remote",
  internship = "internship"
}

export enum JobStatusOptions {
  pending = "pending",
  interview = "interview",
  declined = "declined",
}

export type Job = {
  location: string,
  position: string,
  company: string,
  type: JobTypeOptions,
  status: JobStatusOptions
}