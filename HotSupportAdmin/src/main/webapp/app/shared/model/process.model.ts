import { IAction } from 'app/shared/model/action.model';
import { IApplication } from 'app/shared/model/application.model';
import { IServer } from 'app/shared/model/server.model';

export interface IProcess {
  id?: number;
  processName?: string;
  descProcess?: string;
  actions?: IAction[];
  application?: IApplication;
  server?: IServer;
}

export class Process implements IProcess {
  constructor(
    public id?: number,
    public processName?: string,
    public descProcess?: string,
    public actions?: IAction[],
    public application?: IApplication,
    public server?: IServer
  ) {}
}
