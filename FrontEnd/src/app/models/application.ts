import { Group } from './group';
import { Server } from 'http';
import { Command } from './command';

export class Application {

    id: number;
    appName: string;
    descApp: string;
    services: Group[];
    servers: Server[];
    commands: Command[]
}
