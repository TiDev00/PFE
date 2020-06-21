import { Action } from './action';

export class Command {

    id: number;
    commandName: string;
    descCommand: string;
    output: string;
    result: string;
    actions: Action;
}
