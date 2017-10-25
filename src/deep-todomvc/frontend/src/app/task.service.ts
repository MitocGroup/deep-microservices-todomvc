import { Deep } from './deep.decorator';
import { Task } from './task.model';

@Deep({
  resource: '@ng-todo:task'
})
export class TaskService {
  public deepRequest: any;

  /**
   * Create new task
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  public create(task: Task) {
    return this.deepRequest('create', task, 'POST');
  }

  /**
   * Retrieve all tasks
   * @returns {Promise<Task[]>}
   */
  public retrieve() {
    return this.deepRequest('retrieve');
  }

  /**
   * Update task
   * @param {Task | Task[]} data
   * @returns {Promise<Task> | Promise<Task[]>}
   */
  public update(data: Task|Task[]) {
    return this.deepRequest('update', data, 'PUT');
  }

  /**
   * Delete task
   * @param {Task | Task[]} data
   * @returns {Promise<Task> | Promise<Task[]>}
   */
  public remove(data: Task|Task[]) {
    return this.deepRequest('delete', data, 'POST');
  }

}
