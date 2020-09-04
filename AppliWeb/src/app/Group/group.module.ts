import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupService } from './group.service';
import { GROUP_ROUTES } from './group.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(GROUP_ROUTES)
  ],
  declarations: [
    GroupListComponent,
    GroupEditComponent
  ],
  providers: [GroupService],
  exports: []
})
export class GroupModule { }
