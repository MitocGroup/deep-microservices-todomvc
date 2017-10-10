import { Pipe, PipeTransform } from '@angular/core';

import {Task} from './task.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, completedStatus: string): any {
    if (value.length === 0 || completedStatus === 'all') {
      return value;
    }

    return value.filter((task: Task) => {
      return (completedStatus === 'completed') ? task.Completed : !task.Completed;
    })
  }
}
