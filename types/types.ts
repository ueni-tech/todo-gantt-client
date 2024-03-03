export type TeamType = {
  id?: string;
  name: string;
}

export type ProjectType = {
  id?: string;
  name: string;
}

export type TaskType = {
  id?: string;
  project_id?: string;
  name: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
}

export type UserType = {
  id?: string;
  name: string;
  email: string;
}