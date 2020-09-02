import { User } from "../user/user";

export class Log {
  id: number;
  user: User;
  action: string;
  date: Date;
}
