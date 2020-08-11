import { Pipe, PipeTransform } from '@angular/core';
import { Application } from '../models/application';

@Pipe({
  name: 'appFilter'
})
export class AppFilterPipe implements PipeTransform {

  transform(apps: Application[], searchText: string): Application[] {
    if(searchText == null || searchText == ""){
      return apps;
    }

    return apps.filter(item => item.appName.toLowerCase().includes(searchText.toLowerCase()));
  }

}
