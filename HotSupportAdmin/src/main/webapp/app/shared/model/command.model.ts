import { IAction } from 'app/shared/model/action.model';

export interface ICommand {
  id?: number;
  commandName?: string;
  descCommand?: string;
  actions?: IAction;
}

export class Command implements ICommand {
  constructor(public id?: number, public commandName?: string, public descCommand?: string, public actions?: IAction) {}
}
