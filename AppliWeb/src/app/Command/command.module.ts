import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommandListComponent } from './command-list/command-list.component';
import { CommandEditComponent } from './command-edit/command-edit.component';
import { CommandService } from './command.service';
import { COMMAND_ROUTES } from './command.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(COMMAND_ROUTES)
  ],
  declarations: [
    CommandListComponent,
    CommandEditComponent
  ],
  providers: [CommandService],
  exports: []
})
export class CommandModule { }
