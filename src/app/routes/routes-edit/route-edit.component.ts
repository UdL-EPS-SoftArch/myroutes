import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RouteService} from "../route.service";
import {Route} from "../route";
import {switchMap} from "rxjs/operators";
import {User} from "../../login-basic/user";
import { Location } from '@angular/common'

@Component({
  selector: 'app-routes-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.css']
})
export class RouteEditComponent implements OnInit{
  public route: Route = new Route();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private routesService: RouteService,
              private location: Location) { }

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
      (route: Route) => {
        this.router.navigate([route.uri]);
      });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }
}
