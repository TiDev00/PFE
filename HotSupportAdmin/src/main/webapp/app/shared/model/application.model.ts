import { IProcess } from 'app/shared/model/process.model';
import { IGroup } from 'app/shared/model/group.model';

export interface IApplication {
  id?: number;
  appName?: string;
  descApp?: string;
  processes?: IProcess[];
  service?: IGroup;
}

export class Application implements IApplication {
  constructor(
    public id?: number,
    public appName?: string,
    public descApp?: string,
    public processes?: IProcess[],
    public service?: IGroup
  ) {}
}
