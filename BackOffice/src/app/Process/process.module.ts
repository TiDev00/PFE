import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessEditComponent } from './process-edit/process-edit.component';
import { ProcessService } from './process.service';
import { PROCESS_ROUTES } from './process.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PROCESS_ROUTES)
  ],
  declarations: [
    ProcessListComponent,
    ProcessEditComponent
  ],
  providers: [ProcessService],
  exports: []
})
export class ProcessModule { }
