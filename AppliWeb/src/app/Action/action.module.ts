import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionListComponent } from './action-list/action-list.component';
import { ActionEditComponent } from './action-edit/action-edit.component';
import { ActionService } from './action.service';
import { ACTION_ROUTES } from './action.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ACTION_ROUTES)
  ],
  declarations: [
    ActionListComponent,
    ActionEditComponent
  ],
  providers: [ActionService],
  exports: []
})
export class ActionModule { }
