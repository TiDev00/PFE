import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICommand, Command } from 'app/shared/model/command.model';
import { CommandService } from './command.service';
import { IAction } from 'app/shared/model/action.model';
import { ActionService } from 'app/entities/action/action.service';

@Component({
  selector: 'jhi-command-update',
  templateUrl: './command-update.component.html',
})
export class CommandUpdateComponent implements OnInit {
  isSaving = false;
  actions: IAction[] = [];

  editForm = this.fb.group({
    id: [],
    commandName: [null, [Validators.required]],
    descCommand: [],
    forStatus: [null, [Validators.required]],
    actions: [],
  });

  constructor(
    protected commandService: CommandService,
    protected actionService: ActionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ command }) => {
      this.updateForm(command);

      this.actionService
        .query({ filter: 'commands-is-null' })
        .pipe(
          map((res: HttpResponse<IAction[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAction[]) => {
          if (!command.actions || !command.actions.id) {
            this.actions = resBody;
          } else {
            this.actionService
              .find(command.actions.id)
              .pipe(
                map((subRes: HttpResponse<IAction>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAction[]) => (this.actions = concatRes));
          }
        });
    });
  }

  updateForm(command: ICommand): void {
    this.editForm.patchValue({
      id: command.id,
      commandName: command.commandName,
      descCommand: command.descCommand,
      forStatus: command.forStatus,
      actions: command.actions,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const command = this.createFromForm();
    if (command.id !== undefined) {
      this.subscribeToSaveResponse(this.commandService.update(command));
    } else {
      this.subscribeToSaveResponse(this.commandService.create(command));
    }
  }

  private createFromForm(): ICommand {
    return {
      ...new Command(),
      id: this.editForm.get(['id'])!.value,
      commandName: this.editForm.get(['commandName'])!.value,
      descCommand: this.editForm.get(['descCommand'])!.value,
      forStatus: this.editForm.get(['forStatus'])!.value,
      actions: this.editForm.get(['actions'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommand>>): void {
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

  trackById(index: number, item: IAction): any {
    return item.id;
  }
}
