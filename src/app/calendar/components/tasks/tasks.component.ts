import { Component, inject, signal } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import type { TaskList } from '../../interfaces/task-list.interface';

@Component({
  selector: 'tasks',
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasks = signal<TaskList[]>([]);
  taskService = inject(GoogleCalendarService);

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe({
      next: (resp) => {
        this.tasks.set(resp.taskLists);
      },
      error: (err) => console.error('Error trayendo las tareas:', err),
    });
  }
}
