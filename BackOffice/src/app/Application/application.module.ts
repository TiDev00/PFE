import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { ApplicationService } from './application.service';
import { APPLICATION_ROUTES } from './application.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(APPLICATION_ROUTES)
  ],
  declarations: [
    ApplicationListComponent,
    ApplicationEditComponent
  ],
  providers: [ApplicationService],
  exports: []
})
export class ApplicationModule { }
