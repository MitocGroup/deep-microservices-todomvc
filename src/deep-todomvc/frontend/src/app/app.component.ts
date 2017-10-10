import { Component, OnInit } from '@angular/core';

import { TaskService } from './task.service';
import { Task } from './task.model';

declare const DeepFramework: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public taskInput: string;
  public filterStatus = 'all';
  public taskList: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.retrieve().then((tasks: Task[]) => {
      this.taskList = this.taskList.concat(tasks);
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

    this.taskService.update(task).then(res => {
      console.log('Marked as completed/uncompleted');
    });
  }

  onRemove(task: Task) {
    let index = this.taskList.indexOf(task);

    this.taskService.remove(task).then(res => {
      this.taskList.splice(index, 1);
    });
  }

  onRemoveCompleted() {
    let completedTasks = [];

    this.taskList.forEach((task, index) => {
      if (task.Completed) {
        completedTasks.push(task);
        this.taskList.splice(index, 1);
      }
    });

    this.taskService.remove(completedTasks).then(res => {
      console.log('Removed completed');
    });
  }

  filterBy(status: string) {
    this.filterStatus = status;
  }

}
