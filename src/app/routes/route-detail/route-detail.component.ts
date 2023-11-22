import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouteService} from "../route.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {User} from "../../login-basic/user";
import {switchMap} from "rxjs/operators";
import {Route} from "../route";

@Component({
  selector: 'app-routes-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {
  public route: Route = new Route();
  public pageSize = 5;
  public page = 1;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private routesService: RouteService,
    private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.routesService.getResource(id).pipe(
      switchMap(r => {
        this.route = r;
        return this.route.getRelation<User>('createdBy');
      }),
      switchMap((user: User) => {
        this.route.createdBy = user;
        return this.route.getRelation<User>('createdBy');
      })
    ).subscribe(user => {
      this.route.createdBy = user;
    });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().id;
  }

  currentUserEdit(){
    return this.getCurrentUserName() == this.route.createdBy.username;
  }

}
