export type Task = {
  id: string;
  title: string;
  details: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};
