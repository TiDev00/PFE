import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogListComponent } from './log-list/log-list.component';
import { LogEditComponent } from './log-edit/log-edit.component';
import { LogService } from './log.service';
import { LOG_ROUTES } from './log.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LOG_ROUTES)
  ],
  declarations: [
    LogListComponent,
    LogEditComponent
  ],
  providers: [LogService],
  exports: []
})
export class LogModule { }
