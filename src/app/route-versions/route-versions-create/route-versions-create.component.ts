import {Component, OnInit} from '@angular/core';
import {RouteVersionsService} from "../route-versions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RouteVersion} from "../routeVersion.entity";

@Component({
  selector: 'app-route-versions-create',
  templateUrl: './route-versions-create.component.html',
  styleUrls: ['./route-versions-create.component.scss']
})
export class RouteVersionsCreateComponent implements OnInit{
  public paramRoute: string;
  public routeVersion: RouteVersion = new RouteVersion();
  public title: string;

  constructor(
    private routeVersionService: RouteVersionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.paramRoute = this.route.snapshot.params['param'];
  }

  onSubmit(): void {
    this.routeVersion.versionOf = this.paramRoute
    this.routeVersionService.createResource({ body: this.routeVersion }).subscribe(
      (routeVersion:RouteVersion) => this.router.navigate([routeVersion.uri]))
  }
}
