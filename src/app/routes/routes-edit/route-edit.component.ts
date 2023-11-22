import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouteService} from "../route.service";
import {Route} from "../route";
import {switchMap} from "rxjs/operators";
import {User} from "../../login-basic/user";

@Component({
  selector: 'app-routes-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.css']
})
export class RouteEditComponent {
  public route: Route = new Route();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private routesService: RouteService) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.routesService.getResource(id).subscribe(
      (r: Route) => {this.route = r; this.route.id = id;});

    this.routesService.getResource(id).pipe(
      switchMap(r => {
        this.route = r;
        return this.route.getRelation<User>('createdBy');
      })
    ).subscribe(user => {
      this.route.createdBy = user;
    });

  }

  onSubmit() {
    this.routesService.patchResource(this.route).subscribe(
      (patchedRating: Route) => {
        this.router.navigate(['routes', patchedRating.id]);
      });
  }

  getCurrentRoute(): string {
    return this.route.id;
  }

}
