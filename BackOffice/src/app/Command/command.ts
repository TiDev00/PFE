import { Action } from "../action/action";

export class Command {
  id: number;
  commandName: string;
  forStatus: string;
  descCommand: string;
  actions: Action;
}
