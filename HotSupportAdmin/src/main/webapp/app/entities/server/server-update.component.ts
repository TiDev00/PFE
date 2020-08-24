import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IServer, Server } from 'app/shared/model/server.model';
import { ServerService } from './server.service';

@Component({
  selector: 'jhi-server-update',
  templateUrl: './server-update.component.html',
})
export class ServerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    serverName: [null, [Validators.required]],
    ipServer: [null, [Validators.required]],
    osServer: [],
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(protected serverService: ServerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ server }) => {
      this.updateForm(server);
    });
  }

  updateForm(server: IServer): void {
    this.editForm.patchValue({
      id: server.id,
      serverName: server.serverName,
      ipServer: server.ipServer,
      osServer: server.osServer,
      login: server.login,
      password: server.password,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const server = this.createFromForm();
    if (server.id !== undefined) {
      this.subscribeToSaveResponse(this.serverService.update(server));
    } else {
      this.subscribeToSaveResponse(this.serverService.create(server));
    }
  }

  private createFromForm(): IServer {
    return {
      ...new Server(),
      id: this.editForm.get(['id'])!.value,
      serverName: this.editForm.get(['serverName'])!.value,
      ipServer: this.editForm.get(['ipServer'])!.value,
      osServer: this.editForm.get(['osServer'])!.value,
      login: this.editForm.get(['login'])!.value,
      password: this.editForm.get(['password'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServer>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
