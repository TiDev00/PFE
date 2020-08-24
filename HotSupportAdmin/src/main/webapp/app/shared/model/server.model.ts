import { IProcess } from 'app/shared/model/process.model';

export interface IServer {
  id?: number;
  serverName?: string;
  ipServer?: string;
  osServer?: string;
  login?: string;
  password?: string;
  processes?: IProcess[];
}

export class Server implements IServer {
  constructor(
    public id?: number,
    public serverName?: string,
    public ipServer?: string,
    public osServer?: string,
    public login?: string,
    public password?: string,
    public processes?: IProcess[]
  ) {}
}
