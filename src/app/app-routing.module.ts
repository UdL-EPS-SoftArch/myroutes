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
import {RouteVersionsCreateComponent} from "./route-versions/route-versions-create/route-versions-create.component";

import { RouteFollowedListComponent } from './routeFollowed/route-followed-list/route-followed-list.component';
import { RouteFollowedCreateComponent } from './routeFollowed/route-followed-create/route-followed-create.component';
import { RouteFollowedDetailComponent } from './routeFollowed/route-followed-detail/route-followed-detail.component';
import { RouteFollowedDeleteComponent } from './routeFollowed/route-followed-delete/route-followed-delete.component';
import { RouteFollowedEditComponent } from './routeFollowed/route-followed-edit/route-followed-edit.component';

import {WaypointCreateComponent} from "./waypoint/waypoint-create/waypoint-create.component";
import {WaypointListComponent} from "./waypoint/waypoint-list/waypoint-list.component";
import {WaypointDetailComponent} from "./waypoint/waypoint-detail/waypoint-detail.component";
import {WaypointEditComponent} from "./waypoint/waypoint-edit/waypoint-edit.component";
import {WaypointDeleteComponent} from "./waypoint/waypoint-delete/waypoint-delete.component";
import {RouteVersionsDeleteComponent} from "./route-versions/route-versions-delete/route-versions-delete.component";

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
  { path: 'routes', component: RouteListComponent, canActivate: [CheckLoggedInGuard] },

  { path: 'route-versions-create', component: RouteVersionsCreateComponent, canActivate: [CheckIsNotAdminGuard] },
  { path: 'route-versions/delete', component: RouteVersionsDeleteComponent, canActivate: [CheckIsNotAdminGuard] },

  { path: 'routeFollowed/create', component: RouteFollowedCreateComponent, canActivate: [CheckIsNotAdminGuard] },
  { path: 'routeFollowed/:id/delete', component: RouteFollowedDeleteComponent, canActivate: [CheckIsNotAdminGuard]},
  { path: 'routeFollowed/:id/edit', component: RouteFollowedEditComponent, canActivate: [CheckIsNotAdminGuard]},
  { path: 'routeFollowed/:id', component: RouteFollowedDetailComponent, canActivate: [CheckIsNotAdminGuard]},
  { path: 'routeFollowed', component: RouteFollowedListComponent, canActivate: [CheckIsNotAdminGuard] },

  { path: 'waypoints/create', component: WaypointCreateComponent, canActivate: [CheckIsNotAdminGuard] },
  { path: 'waypoints/:id', component: WaypointDetailComponent, canActivate: [CheckIsNotAdminGuard] },
  { path: 'waypoints/:id/edit', component: WaypointEditComponent, canActivate: [CheckIsNotAdminGuard]},
  { path: 'waypoints/:id/delete', component: WaypointDeleteComponent, canActivate: [CheckIsAdminGuard]},
  { path: 'waypoints', component: WaypointListComponent, canActivate: [CheckLoggedInGuard] },

  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
  { path: 'coordinates', loadChildren: () => import('./coordinate/coordinate-routing.module').then(m => m.CoordinateRoutingModule), canActivate: [CheckLoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
