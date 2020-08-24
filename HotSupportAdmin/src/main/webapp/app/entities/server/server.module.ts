import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotSupportAdminSharedModule } from 'app/shared/shared.module';
import { ServerComponent } from './server.component';
import { ServerDetailComponent } from './server-detail.component';
import { ServerUpdateComponent } from './server-update.component';
import { ServerDeleteDialogComponent } from './server-delete-dialog.component';
import { serverRoute } from './server.route';

@NgModule({
  imports: [HotSupportAdminSharedModule, RouterModule.forChild(serverRoute)],
  declarations: [ServerComponent, ServerDetailComponent, ServerUpdateComponent, ServerDeleteDialogComponent],
  entryComponents: [ServerDeleteDialogComponent],
})
export class HotSupportAdminServerModule {}
