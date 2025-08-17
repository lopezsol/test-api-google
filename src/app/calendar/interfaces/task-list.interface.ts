import type { Task } from "./task.interface";

export interface TaskList {
  id: string;
  title: string;
  type: string;
  tasks: Task[];
}
