import {NgModule} from "@angular/core";
import {CoordinateListComponent} from "./coordinate-list/coordinate-list.component";
import {CoordinateCreateComponent} from "./coordinate-create/coordinate-create.component";
import {CoordinateUpdateComponent} from "./coordinate-update/coordinate-update.component";
import {CoordinateDetailComponent} from "./coordinate-detail/coordinate-detail.component";
import {CoordinateDeleteComponent} from "./coordinate-delete/coordinate-delete.component";
import {CoordinateSearchComponent} from "./coordinate-search/coordinate-search.component";
import {CoordinateRoutingModule} from "./coordinate-routing.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../login-basic/auth-interceptor";
import {HttpErrorInterceptor} from "../error-handler/http-error-interceptor";
import {AuthenticationBasicService} from "../login-basic/authentication-basic.service";
import {UserService} from "../user/user.service";
import {AppComponent} from "../app.component";

@NgModule({
  declarations: [
    CoordinateListComponent,
    CoordinateCreateComponent,
    CoordinateUpdateComponent,
    CoordinateDetailComponent,
    CoordinateDeleteComponent,
    CoordinateSearchComponent
  ],
  imports: [
    CoordinateRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    AuthenticationBasicService, UserService
  ],
  bootstrap: [AppComponent]
})
export class CoordinateModule { }
