import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {RouteService} from "../route.service";
import {Route} from "../route";

@Component({
  selector: 'app-routes-delete',
  templateUrl: './route-delete.component.html',
  styleUrls: ['./route-delete.component.css']
})
export class RouteDeleteComponent implements OnInit{

  public route: Route = new Route();
  private id: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private routesService: RouteService) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.routesService.getResource(this.id).subscribe(
      routes => this.route = routes);
  }

  delete(): void {
    this.routesService.deleteResource(this.route).subscribe(
      () => {
        this.router.navigate(['routes']);
      });
  }
}
