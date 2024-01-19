import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Route} from "../../routes/route";
import {RouteService} from "../../routes/route.service";
import {RouteFollowedService} from "../../routeFollowed/routeFollowed.service";
import {RouteFollowed} from "../../routeFollowed/routeFollowed";
import {RouteVersionsService} from "../../route-versions/route-versions.service";
import {RouteVersion} from "../../route-versions/routeVersion.entity";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  public user: User = new User();
  public routes: Route[] = [];
  public routesFollowed: RouteFollowed[] = [];
  public routesVersions: RouteVersion[] = [];


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationBasicService,
              private routesService: RouteService,
              private routeFollowedService: RouteFollowedService,
              private routeVersionsService: RouteVersionsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getResource(id).subscribe(
      user => {
        this.user = user;
        this.routesService.findByCreatedBy(this.user).subscribe((page: PagedResourceCollection<Route>) => {
          this.routes = page.resources;
          this.routes.map(routes => {
            routes.getRelation('createdBy')
              .subscribe((user: User) => {
                routes.createdBy = user;
              });
          });
        });
        this.routeFollowedService.findByCreatedBy(this.user).subscribe((page: PagedResourceCollection<RouteFollowed>) => {
          this.routesFollowed = page.resources;
          console.log(page.resources);
          this.routesFollowed.map(routesFollowed => {
            routesFollowed.getRelation('createdBy')
              .subscribe((user: User) => {
                routesFollowed.createdBy = user;
              });
          });
        });
        this.routeVersionsService.findByCreatedBy(this.user).subscribe((page: PagedResourceCollection<RouteVersion>) => {
          this.routesVersions = page.resources;
          console.log(this.routesVersions);
          this.routesVersions.map(routesVersions => {
            routesVersions.getRelation('createdBy')
              .subscribe((user: User) => {
                routesVersions.createdBy = user;
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

  swapClass(activateId: string,deactivateIds:string[]): void {
    var element = document.getElementById(activateId).classList;
    if (element.contains('btn-secondary'))
      element.replace('btn-secondary', 'btn-outline-secondary');
    else
      element.replace('btn-outline-secondary', 'btn-secondary');
    deactivateIds.forEach((deactivateId) => { document.getElementById(deactivateId).classList.replace('btn-secondary', 'btn-outline-secondary'); });
  }
}
