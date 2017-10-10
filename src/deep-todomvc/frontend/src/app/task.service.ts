import { Deep } from './deep.decorator';
import { Task } from './task.model';

@Deep({
  resource: '@ng-todo:task'
})
export class TaskService {
  public deepRequest: any;

  /**
   * Create new task
   * @param {string} title
   * @returns {Promise<Task>}
   */
  public create(title: string) {
    return this.deepRequest('create', new Task(title));
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
    return this.deepRequest('update', data);
  }

  /**
   * Delete task
   * @param {Task | Task[]} data
   * @returns {Promise<Task> | Promise<Task[]>}
   */
  public remove(data: Task|Task[]) {
    return this.deepRequest('delete', data);
  }

}
