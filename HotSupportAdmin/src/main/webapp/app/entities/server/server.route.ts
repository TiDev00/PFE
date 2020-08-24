import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServer, Server } from 'app/shared/model/server.model';
import { ServerService } from './server.service';
import { ServerComponent } from './server.component';
import { ServerDetailComponent } from './server-detail.component';
import { ServerUpdateComponent } from './server-update.component';

@Injectable({ providedIn: 'root' })
export class ServerResolve implements Resolve<IServer> {
  constructor(private service: ServerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((server: HttpResponse<Server>) => {
          if (server.body) {
            return of(server.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Server());
  }
}

export const serverRoute: Routes = [
  {
    path: '',
    component: ServerComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Servers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ServerDetailComponent,
    resolve: {
      server: ServerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Servers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ServerUpdateComponent,
    resolve: {
      server: ServerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Servers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ServerUpdateComponent,
    resolve: {
      server: ServerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Servers',
    },
    canActivate: [UserRouteAccessService],
  },
];
