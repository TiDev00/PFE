import { Application } from "../application/application";
import { Server } from "../server/server";
import { Action } from "../action/action";

export class Process {
  id: number;
  processName: string;
  descProcess: string;
  application: Application;
  server: Server;
  actions: Action[];
}
