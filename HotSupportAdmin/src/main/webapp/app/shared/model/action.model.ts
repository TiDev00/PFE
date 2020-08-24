import { IProcess } from 'app/shared/model/process.model';
import { ICommand } from 'app/shared/model/command.model';

export interface IAction {
  id?: number;
  actionName?: string;
  descAction?: string;
  process?: IProcess;
  commands?: ICommand;
}

export class Action implements IAction {
  constructor(
    public id?: number,
    public actionName?: string,
    public descAction?: string,
    public process?: IProcess,
    public commands?: ICommand
  ) {}
}
