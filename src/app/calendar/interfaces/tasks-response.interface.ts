import type { TaskList } from "./task-list.interface";

export interface TasksResponse {
  success: boolean;
  message: string;
  userEmail: string;
  taskListCount: number;
  totalTasks: number;
  taskLists: TaskList[];
  timestamp: number;
  note: string;
}
