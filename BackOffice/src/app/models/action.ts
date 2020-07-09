import { Process } from './process';
import { Command } from './command';

export class Action {

    id: number;
    actionName: string;
    descAction: string;
    processes: Process;
    commands: Command[]
}
