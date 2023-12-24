import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Route} from 'src/app/routes/route';
import {User} from "../../login-basic/user";
import {RouteFollowed} from "../routeFollowed";
import {RouteFollowedService} from "../routeFollowed.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {RouteService} from "../../routes/route.service";
import {UserService} from "../../user/user.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-route-followed-create',
  templateUrl: './route-followed-create.component.html',
  styleUrls: ['./route-followed-create.component.css']
})
export class RouteFollowedCreateComponent implements OnInit {
  public routeFollowed: RouteFollowed = new RouteFollowed();
  public routes: Route[] = [];
  public createdBy: User = new User();
  public creationDate: Date;
  public duration: number;
  public users: User[] = [];

  constructor(private router: Router,
              private authenticationService: AuthenticationBasicService,
              private routeService: RouteService,
              private userService: UserService,
              private routeFollowedService: RouteFollowedService) { }
  ngOnInit(): void {
    this.createdBy = this.getCurrentUserName();
    this.creationDate = new Date();
    this.loadRouteList();
  }

  loadRouteList() {
    this.routeService.getPage({ pageParams:  { size: 10 }, sort: { name: 'ASC' } })
      .subscribe((routes: PagedResourceCollection<Route>) => {
        this.routes = routes.resources;
      });
  }

  onSubmit(): void {
    this.routeFollowed.createdBy = this.authenticationService.getCurrentUser();
    this.routeFollowedService.createResource({ body: this.routeFollowed }).subscribe(
      () => this.router.navigate([this.routeFollowed.follows]));
  }

  getCurrentUserName(): User {
    return this.authenticationService.getCurrentUser();
  }

}
