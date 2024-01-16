import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Route} from "../../routes/route";
import {RouteService} from "../../routes/route.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  public user: User = new User();
  public routes: Route[] = [];


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationBasicService,
              private routesService: RouteService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getResource(id).subscribe(
      user => {
        this.user = user;
        this.routesService.findByCreatedBy(this.user).subscribe((page: PagedResourceCollection<Route>) => {
          this.routes = page.resources;
          console.log(this.routes);
          this.routes.map(routes => {
            routes.getRelation('createdBy')
              .subscribe((user: User) => {
                routes.createdBy = user;
              });
          });
        });
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }

  getCurrentUserName(): string {
    return this.getCurrentUser().id;
  }

  currentUserEdit(username: string){
    return this.getCurrentUserName() == username;
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }
}
