import { Process } from "../process/process";
import { Command } from "../command/command";

export class Action {
  id: number;
  actionName: string;
  descAction: string;
  processes: Process;
  commands: Command;
}
