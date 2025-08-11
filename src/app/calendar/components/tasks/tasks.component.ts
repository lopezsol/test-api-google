import { Component, signal } from '@angular/core';

@Component({
  selector: 'tasks',
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  tasks = signal<any[]>([]);

  ngOnInit() {
    this.loadTasks();
  }

  async loadTasks() {
    try {
      console.log('loadTaks');
      const accessToken = sessionStorage.getItem('access_token');
      if (!accessToken) throw new Error('No hay token de acceso');

      // Obtener listas de tareas
      const taskListsResponse = await fetch(
        'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const taskLists = await taskListsResponse.json();
      console.log('Listas de tareas:', taskLists.items);

      const allTasks: any[] = [];
      const taskMap = new Map<string, any>();
      const rootTasks: any[] = [];

      for (const list of taskLists.items) {
        const tasksResponse = await fetch(
          `https://tasks.googleapis.com/tasks/v1/lists/${list.id}/tasks?showCompleted=true&showHidden=true`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const tasksData = await tasksResponse.json();
        console.log(`Tareas de ${list.title}:`, tasksData.items);

        allTasks.push(
          ...(tasksData.items || []).map((task: any) => ({
            ...task,
            listTitle: list.title,
            listId: list.id,
          }))
        );

        const allTasksFlat = (tasksData.items || []).map((task: any) => ({
          ...task,
          listTitle: list.title,
          listId: list.id,
        }));
        // Armar un mapa de id de tarea a tarea
        allTasksFlat.forEach((task: any) =>
          taskMap.set(task.id, { ...task, subtasks: [] })
        );

        for (const task of taskMap.values()) {
          if (task.parent && taskMap.has(task.parent)) {
            // Esta es una subtarea, agregarla al array subtasks de la tarea padre
            taskMap.get(task.parent).subtasks.push(task);
          } else {
            // No tiene padre, es tarea raíz
            rootTasks.push(task);
          }
        }

        // Finalmente, guardar solo las tareas raíz con sus subtareas anidadas
        this.tasks.set(rootTasks);
      }

      this.tasks.set(allTasks);
    } catch (e) {
      console.error('Error cargando tareas:', e);
    }
  }
}
