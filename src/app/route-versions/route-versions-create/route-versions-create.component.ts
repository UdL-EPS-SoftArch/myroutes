import {Component, OnInit} from '@angular/core';
import {RouteVersionsService} from "../route-versions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {RouteVersion} from "../routeVersion.entity";
import {Route} from "../../routes/route";

@Component({
  selector: 'app-route-versions-create',
  templateUrl: './route-versions-create.component.html',
  styleUrls: ['./route-versions-create.component.scss']
})
export class RouteVersionsCreateComponent implements OnInit{
  public paramRoute: Route;
  public routeVersion: RouteVersion = new RouteVersion();
  public title: string;

  constructor(
    private routeVersionService: RouteVersionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.paramRoute = JSON.parse(this.route.snapshot.params['param']) as Route
  }

  onSubmit(): void {
    this.routeVersion.versionOf = this.paramRoute
    this.routeVersionService.createResource({ body: this.routeVersion }).subscribe(
      (routeVersion:RouteVersion) => this.router.navigate([routeVersion.uri]))
  }
}
