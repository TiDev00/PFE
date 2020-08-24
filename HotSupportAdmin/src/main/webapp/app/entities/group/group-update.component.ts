import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGroup, Group } from 'app/shared/model/group.model';
import { GroupService } from './group.service';

@Component({
  selector: 'jhi-group-update',
  templateUrl: './group-update.component.html',
})
export class GroupUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    serviceName: [null, [Validators.required]],
    descService: [],
  });

  constructor(protected groupService: GroupService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ group }) => {
      this.updateForm(group);
    });
  }

  updateForm(group: IGroup): void {
    this.editForm.patchValue({
      id: group.id,
      serviceName: group.serviceName,
      descService: group.descService,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const group = this.createFromForm();
    if (group.id !== undefined) {
      this.subscribeToSaveResponse(this.groupService.update(group));
    } else {
      this.subscribeToSaveResponse(this.groupService.create(group));
    }
  }

  private createFromForm(): IGroup {
    return {
      ...new Group(),
      id: this.editForm.get(['id'])!.value,
      serviceName: this.editForm.get(['serviceName'])!.value,
      descService: this.editForm.get(['descService'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroup>>): void {
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
