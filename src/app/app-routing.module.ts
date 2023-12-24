import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';

import { RouteDeleteComponent } from './routes/route-delete/route-delete.component';
import { RouteListComponent } from './routes/route-list/route-list.component';
import { RouteCreateComponent } from './routes/route-create/route-create.component';
import { RouteDetailComponent } from './routes/route-detail/route-detail.component';
import { RouteEditComponent } from './routes/routes-edit/route-edit.component';
import {CheckIsAdminGuard, CheckIsNotAdminGuard,CheckLoggedInGuard} from "./login-basic/authentication.guard";

import {WaypointCreateComponent} from "./waypoint/waypoint-create/waypoint-create.component";
import {WaypointListComponent} from "./waypoint/waypoint-list/waypoint-list.component";

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [CheckLoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [CheckLoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [CheckLoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [CheckLoggedInGuard]},

  { path: 'routes/create', component: RouteCreateComponent, canActivate: [CheckIsNotAdminGuard] },
  { path: 'routes/:id/delete', component: RouteDeleteComponent, canActivate: [CheckIsAdminGuard]},
  { path: 'routes/:id/edit', component: RouteEditComponent, canActivate: [CheckIsNotAdminGuard]},
  { path: 'routes/:id', component: RouteDetailComponent, canActivate: [CheckIsNotAdminGuard]},
  { path: 'routes', component: RouteListComponent, canActivate: [CheckIsNotAdminGuard] },

  { path: 'waypoints/create', component: WaypointCreateComponent, canActivate: [CheckIsNotAdminGuard] },
  { path: 'waypoints', component: WaypointListComponent, canActivate: [CheckIsNotAdminGuard] },

  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
  { path: 'coordinates', loadChildren: () => import('./coordinate/coordinate-routing.module').then(m => m.CoordinateRoutingModule), canActivate: [CheckIsNotAdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
