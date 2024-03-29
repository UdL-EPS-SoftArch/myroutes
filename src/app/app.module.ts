import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxHateoasClientConfigurationService, NgxHateoasClientModule} from '@lagoshny/ngx-hateoas-client';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AboutComponent} from './about/about.component';
import {NotFoundComponent} from './error-handler/error-alert/not-found.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserDeleteComponent} from './user/user-delete/user-delete.component';
import {UserSearchComponent} from './user/user-search/user-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbCollapseModule, NgbDropdownModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginBasicModule} from './login-basic/login-basic.module';
import {ErrorHandlerModule} from './error-handler/error-handler.module';
import {AuthInterceptor} from './login-basic/auth-interceptor';
import {HttpErrorInterceptor} from './error-handler/http-error-interceptor';
import {AuthenticationBasicService} from './login-basic/authentication-basic.service';
import {UserService} from './user/user.service';
import {CoordinateModule} from "./coordinate/coordinate.module";

import {RouteCreateComponent} from "./routes/route-create/route-create.component";
import { RouteListComponent } from './routes/route-list/route-list.component';
import { RouteDetailComponent } from './routes/route-detail/route-detail.component';
import { RouteEditComponent } from './routes/routes-edit/route-edit.component';
import { RouteDeleteComponent } from './routes/route-delete/route-delete.component';
import { RouteSearchComponent } from './routes/route-search/route-search.component';
import { RouteFilterComponent } from './routes/route-filter/route-filter.component';

import {WaypointCreateComponent} from "./waypoint/waypoint-create/waypoint-create.component";
import {WaypointListComponent} from "./waypoint/waypoint-list/waypoint-list.component";
import {WaypointDetailComponent} from "./waypoint/waypoint-detail/waypoint-detail.component";
import {WaypointEditComponent} from "./waypoint/waypoint-edit/waypoint-edit.component";
import {WaypointDeleteComponent} from "./waypoint/waypoint-delete/waypoint-delete.component";

import {PermissionsService } from "./login-basic/authentication.guard";
import {RouteFollowedCreateComponent} from "./routeFollowed/route-followed-create/route-followed-create.component";
import {RouteFollowedDeleteComponent} from "./routeFollowed/route-followed-delete/route-followed-delete.component";
import {RouteFollowedEditComponent} from "./routeFollowed/route-followed-edit/route-followed-edit.component";
import {RouteFollowedListComponent} from "./routeFollowed/route-followed-list/route-followed-list.component";
import {RouteFollowedDetailComponent} from "./routeFollowed/route-followed-detail/route-followed-detail.component";

import { RouteVersionsCreateComponent } from './route-versions/route-versions-create/route-versions-create.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { RouteVersionsListComponent } from './route-versions/route-versions-list/route-versions-list.component';
import { RouteVersionsDeleteComponent } from './route-versions/route-versions-delete/route-versions-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    NotFoundComponent,
    UserListComponent,
    UserDetailComponent,
    UserRegisterComponent,
    UserEditComponent,
    UserDeleteComponent,
    UserSearchComponent,
    RouteCreateComponent,
    RouteListComponent,
    RouteFilterComponent,
    RouteSearchComponent,
    RouteDeleteComponent,
    RouteEditComponent,
    RouteDetailComponent,
    WaypointCreateComponent,
    WaypointListComponent,
    WaypointDetailComponent,
    WaypointEditComponent,
    WaypointDeleteComponent,
    RouteFollowedCreateComponent,
    RouteFollowedDeleteComponent,
    RouteFollowedEditComponent,
    RouteFollowedListComponent,
    RouteFollowedDetailComponent,
    RouteVersionsCreateComponent,
    RouteVersionsListComponent,
    RouteVersionsDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgxHateoasClientModule.forRoot(),
    LoginBasicModule,
    ErrorHandlerModule,
    NgbModule,
    ReactiveFormsModule,
    CoordinateModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxDatatableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    AuthenticationBasicService, PermissionsService, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(hateoasConfig: NgxHateoasClientConfigurationService) {
    hateoasConfig.configure({
      http: {
        rootUrl: environment.API
      }
    });
  }
}
