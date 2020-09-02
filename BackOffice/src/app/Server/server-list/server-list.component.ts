import { Component, OnInit } from '@angular/core';
import { ServerFilter } from '../server-filter';
import { ServerService } from '../server.service';
import { Server } from '../server';

@Component({
  selector: 'app-server',
  templateUrl: 'server-list.component.html'
})
export class ServerListComponent implements OnInit {

  filter = new ServerFilter();
  selectedServer: Server;
  feedback: any = {};

  get serverList(): Server[] {
    return this.serverService.serverList;
  }

  constructor(private serverService: ServerService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.serverService.load(this.filter);
  }

  select(selected: Server): void {
    this.selectedServer = selected;
  }

  delete(server: Server): void {
    if (confirm('Are you sure?')) {
      this.serverService.delete(server).subscribe(() => {
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
