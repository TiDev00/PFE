import { Log } from './log';
import { Group } from './group';
import { Profile } from './profile';

export class User {

    matricule: string;
    firstName: string;
    LastName: string;
    email: string;
    password: string;
    log: Log;
    service: Group;
    profiles: Profile[]
}
