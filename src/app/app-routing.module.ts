import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
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

import { RouteFollowedListComponent } from './routeFollowed/route-followed-list/route-followed-list.component';
import { RouteFollowedCreateComponent } from './routeFollowed/route-followed-create/route-followed-create.component';
import { RouteFollowedDetailComponent } from './routeFollowed/route-followed-detail/route-followed-detail.component';
import { RouteFollowedDeleteComponent } from './routeFollowed/route-followed-delete/route-followed-delete.component';
import { RouteFollowedEditComponent } from './routeFollowed/route-followed-edit/route-followed-edit.component';

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},

  { path: 'routes/create', component: RouteCreateComponent, canActivate: [LoggedInGuard] },
  { path: 'routes/:id/delete', component: RouteDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'routes/:id/edit', component: RouteEditComponent, canActivate: [LoggedInGuard]},
  { path: 'routes/:id', component: RouteDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'routes', component: RouteListComponent, canActivate: [LoggedInGuard] },

  { path: 'routeFollowed/create', component: RouteFollowedCreateComponent, canActivate: [LoggedInGuard] },
  { path: 'routeFollowed/:id/delete', component: RouteFollowedDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'routeFollowed/:id/edit', component: RouteFollowedEditComponent, canActivate: [LoggedInGuard]},
  { path: 'routeFollowed/:id', component: RouteFollowedDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'routeFollowed', component: RouteFollowedListComponent, canActivate: [LoggedInGuard] },

  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
