import { Application } from './application';
import { Server } from 'http';
import { Action } from './action';

export class Process {

    id: number;
    processName: string;
    descProcess: string;
    application: Application;
    server: Server;
    actions: Action[]
}
