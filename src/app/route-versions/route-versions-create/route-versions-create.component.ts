import { Component } from '@angular/core';
import {RouteVersionsService} from "../route-versions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-route-versions-create',
  templateUrl: './route-versions-create.component.html',
  styleUrls: ['./route-versions-create.component.scss']
})
export class RouteVersionsCreateComponent {
  constructor(
    private routeVersionService: RouteVersionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
}
