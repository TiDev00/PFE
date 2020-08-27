import { IAction } from 'app/shared/model/action.model';
import { StatusType } from 'app/shared/model/enumerations/status-type.model';

export interface ICommand {
  id?: number;
  commandName?: string;
  descCommand?: string;
  forStatus?: StatusType;
  actions?: IAction;
}

export class Command implements ICommand {
  constructor(
    public id?: number,
    public commandName?: string,
    public descCommand?: string,
    public forStatus?: StatusType,
    public actions?: IAction
  ) {}
}
