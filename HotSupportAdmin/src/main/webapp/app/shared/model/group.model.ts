import { IApplication } from 'app/shared/model/application.model';

export interface IGroup {
  id?: number;
  serviceName?: string;
  descService?: string;
  applications?: IApplication[];
}

export class Group implements IGroup {
  constructor(public id?: number, public serviceName?: string, public descService?: string, public applications?: IApplication[]) {}
}
