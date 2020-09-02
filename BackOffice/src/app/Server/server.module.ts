import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServerListComponent } from './server-list/server-list.component';
import { ServerEditComponent } from './server-edit/server-edit.component';
import { ServerService } from './server.service';
import { SERVER_ROUTES } from './server.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SERVER_ROUTES)
  ],
  declarations: [
    ServerListComponent,
    ServerEditComponent
  ],
  providers: [ServerService],
  exports: []
})
export class ServerModule { }
