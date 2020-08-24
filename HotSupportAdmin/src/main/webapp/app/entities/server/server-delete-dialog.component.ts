import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServer } from 'app/shared/model/server.model';
import { ServerService } from './server.service';

@Component({
  templateUrl: './server-delete-dialog.component.html',
})
export class ServerDeleteDialogComponent {
  server?: IServer;

  constructor(protected serverService: ServerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serverService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serverListModification');
      this.activeModal.close();
    });
  }
}
