import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAction, Action } from 'app/shared/model/action.model';
import { ActionService } from './action.service';
import { IProcess } from 'app/shared/model/process.model';
import { ProcessService } from 'app/entities/process/process.service';

@Component({
  selector: 'jhi-action-update',
  templateUrl: './action-update.component.html',
})
export class ActionUpdateComponent implements OnInit {
  isSaving = false;
  processes: IProcess[] = [];

  editForm = this.fb.group({
    id: [],
    actionName: [null, [Validators.required]],
    descAction: [],
    process: [],
  });

  constructor(
    protected actionService: ActionService,
    protected processService: ProcessService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ action }) => {
      this.updateForm(action);

      this.processService.query().subscribe((res: HttpResponse<IProcess[]>) => (this.processes = res.body || []));
    });
  }

  updateForm(action: IAction): void {
    this.editForm.patchValue({
      id: action.id,
      actionName: action.actionName,
      descAction: action.descAction,
      process: action.process,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const action = this.createFromForm();
    if (action.id !== undefined) {
      this.subscribeToSaveResponse(this.actionService.update(action));
    } else {
      this.subscribeToSaveResponse(this.actionService.create(action));
    }
  }

  private createFromForm(): IAction {
    return {
      ...new Action(),
      id: this.editForm.get(['id'])!.value,
      actionName: this.editForm.get(['actionName'])!.value,
      descAction: this.editForm.get(['descAction'])!.value,
      process: this.editForm.get(['process'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAction>>): void {
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

  trackById(index: number, item: IProcess): any {
    return item.id;
  }
}
