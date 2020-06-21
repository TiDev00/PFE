import { Group } from './group';
import { Process } from './process';

export class Application {

    id: number;
    appName: string;
    descApp: string;
    services: Group;
    processes: Process[];
}
