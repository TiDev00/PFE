import { Component, OnInit } from '@angular/core';
import { CommandFilter } from '../command-filter';
import { CommandService } from '../command.service';
import { Command } from '../command';

@Component({
  selector: 'app-command',
  templateUrl: 'command-list.component.html'
})
export class CommandListComponent implements OnInit {

  filter = new CommandFilter();
  selectedCommand: Command;
  feedback: any = {};

  get commandList(): Command[] {
    return this.commandService.commandList;
  }

  constructor(private commandService: CommandService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.commandService.load(this.filter);
  }

  select(selected: Command): void {
    this.selectedCommand = selected;
  }

  delete(command: Command): void {
    if (confirm('Are you sure?')) {
      this.commandService.delete(command).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
