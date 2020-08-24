import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IApplication, Application } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';
import { IGroup } from 'app/shared/model/group.model';
import { GroupService } from 'app/entities/group/group.service';

@Component({
  selector: 'jhi-application-update',
  templateUrl: './application-update.component.html',
})
export class ApplicationUpdateComponent implements OnInit {
  isSaving = false;
  groups: IGroup[] = [];

  editForm = this.fb.group({
    id: [],
    appName: [null, [Validators.required]],
    descApp: [],
    service: [],
  });

  constructor(
    protected applicationService: ApplicationService,
    protected groupService: GroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ application }) => {
      this.updateForm(application);

      this.groupService.query().subscribe((res: HttpResponse<IGroup[]>) => (this.groups = res.body || []))
    });
  }

  updateForm(application: IApplication): void {
    this.editForm.patchValue({
      id: application.id,
      appName: application.appName,
      descApp: application.descApp,
      service: application.service,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const application = this.createFromForm();
    if (application.id !== undefined) {
      this.subscribeToSaveResponse(this.applicationService.update(application));
    } else {
      this.subscribeToSaveResponse(this.applicationService.create(application));
    }
  }

  private createFromForm(): IApplication {
    return {
      ...new Application(),
      id: this.editForm.get(['id'])!.value,
      appName: this.editForm.get(['appName'])!.value,
      descApp: this.editForm.get(['descApp'])!.value,
      service: this.editForm.get(['service'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>): void {
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

  trackById(index: number, item: IGroup): any {
    return item.id;
  }
}
