import { Pipe, PipeTransform } from '@angular/core';
import { startCase } from 'lodash';

@Pipe({ name: 'startCase' })
export class StarCasePipe implements PipeTransform {
  transform(value: string) {
    return startCase(value);
  }
}
