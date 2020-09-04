import { Group } from "../group/group";
import { Process } from "../process/process";

export class Application {
  id: number;
  appName: string;
  descApp: string;
  service: Group;
  processes: Process[];
}
