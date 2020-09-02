import { Action } from './action';


export class Command {
    id: number;
    commandName: string;
    descCommand: string;
    actions: Action
}
