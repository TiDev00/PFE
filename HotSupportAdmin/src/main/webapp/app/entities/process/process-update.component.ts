import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProcess, Process } from 'app/shared/model/process.model';
import { ProcessService } from './process.service';
import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from 'app/entities/application/application.service';
import { IServer } from 'app/shared/model/server.model';
import { ServerService } from 'app/entities/server/server.service';

type SelectableEntity = IApplication | IServer;

@Component({
  selector: 'jhi-process-update',
  templateUrl: './process-update.component.html',
})
export class ProcessUpdateComponent implements OnInit {
  isSaving = false;
  applications: IApplication[] = [];
  servers: IServer[] = [];

  editForm = this.fb.group({
    id: [],
    processName: [null, [Validators.required]],
    descProcess: [],
    application: [],
    server: [],
  });

  constructor(
    protected processService: ProcessService,
    protected applicationService: ApplicationService,
    protected serverService: ServerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ process }) => {
      this.updateForm(process);

      this.applicationService.query().subscribe((res: HttpResponse<IApplication[]>) => (this.applications = res.body || []));

      this.serverService.query().subscribe((res: HttpResponse<IServer[]>) => (this.servers = res.body || []));
    });
  }

  updateForm(process: IProcess): void {
    this.editForm.patchValue({
      id: process.id,
      processName: process.processName,
      descProcess: process.descProcess,
      application: process.application,
      server: process.server,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const process = this.createFromForm();
    if (process.id !== undefined) {
      this.subscribeToSaveResponse(this.processService.update(process));
    } else {
      this.subscribeToSaveResponse(this.processService.create(process));
    }
  }

  private createFromForm(): IProcess {
    return {
      ...new Process(),
      id: this.editForm.get(['id'])!.value,
      processName: this.editForm.get(['processName'])!.value,
      descProcess: this.editForm.get(['descProcess'])!.value,
      application: this.editForm.get(['application'])!.value,
      server: this.editForm.get(['server'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcess>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
