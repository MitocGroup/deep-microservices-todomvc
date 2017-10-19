import { Component, OnInit } from '@angular/core';

import { TaskService } from './task.service';
import { Task } from './task.model';

declare const DeepFramework: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public markAll:boolean = false;
  public taskInput: string;
  public filterStatus = 'all';
  public taskList: Task[] = [];
  public completedList: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.retrieve().then((tasks: Task[]) => {
      this.taskList = this.taskList.concat(tasks);
      this.completedList = tasks.filter(task => task.Completed);
    });
  }

  onCreate() {
    this.taskService.create(this.taskInput).then((task: Task) => {
      this.taskList.push(task);
      this.taskInput = '';
    });
  }

  onCompleted(task: Task) {
    task.Completed = !task.Completed;

    this.taskService.update(task).then(() => {
      if (task.Completed) {
        this.completedList.push(task);
      } else {
        this.removeFromCompletedList(task);
      }
    });
  }

  markAllCompleted() {
    let tasksToUpdate = this.taskList.map(task => {
      task.Completed = this.markAll;
      return task;
    });

    if (tasksToUpdate.length) {
      this.taskService.update(tasksToUpdate).then(() => {
        if (this.markAll) {
          this.completedList = tasksToUpdate;
        } else {
          this.completedList = [];
        }
      });
    }
  }

  onRemoveCompleted() {
    this.taskService.remove(this.completedList).then(() => {
      this.completedList.forEach(task => {
        this.removeFromFullList(task);
      });
      this.completedList = [];
    });
  }

  onRemove(task: Task) {
    this.taskService.remove(task).then(() => {
      this.removeFromCompletedList(task);
      this.removeFromFullList(task);
    });
  }

  filterBy(status: string) {
    this.filterStatus = status;
  }

  /**
   * Remove task from completed tasks lists
   * @param {Task} task
   */
  private removeFromCompletedList(task: Task) {
    let index = this.completedList.indexOf(task);
    if (index >= 0) {
      this.completedList.splice(index, 1);
    }
  }

  /**
   * Remove task from completed tasks lists
   * @param {Task} task
   */
  private removeFromFullList(task: Task) {
    let index = this.taskList.indexOf(task);
    if (index >= 0) {
      this.taskList.splice(index, 1);
    }
  }

}
